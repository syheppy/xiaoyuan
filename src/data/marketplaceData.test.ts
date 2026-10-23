import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INITIAL_PRODUCTS,
  INITIAL_WANTED_ITEMS,
  buildWantedItem,
  filterProducts,
  filterWantedItems,
  filterZoneItems,
  evaluateOfferPrice,
  validatePublishForm,
  validateRegisterForm,
} from './marketplaceData.ts';

test('buildWantedItem validates inputs and computes accurate budget range and recommended price', () => {
  const invalid = buildWantedItem({
    title: '',
    category: '宿舍生活好物',
    budgetMin: 20,
    budgetMax: 40,
    location: '清远校区 · 桂香园宿舍',
    campus: '清远校区',
    userDept: '建工系·大一',
    description: '',
  });
  assert.equal(invalid.valid, false);

  const valid = buildWantedItem({
    title: '急收一套工程测量教材与计算器',
    category: '教材与考证',
    budgetMin: 20,
    budgetMax: 40,
    location: '清远校区 · 图文信息中心',
    campus: '清远校区',
    userDept: '建工系·大一',
    description: '期末复习急用，有重点笔记更好',
  });
  assert.equal(valid.valid, true);
  assert.equal(valid.item?.budgetText, '¥20-40');
  assert.equal(valid.item?.budgetMin, 20);
  assert.equal(valid.item?.budgetMax, 40);
  assert.equal(valid.item?.recommendedPrice, 30);
  assert.equal(valid.item?.category, '教材与考证');
});

test('filterZoneItems returns items for all 4 campus secondary zones and filters by tab and keyword', () => {
  assert.equal(filterZoneItems('freshman', '全部', '').length, 6);
  assert.equal(filterZoneItems('graduation', '全部', '').length, 6);
  assert.equal(filterZoneItems('textbook', '全部', '').length, 6);
  assert.equal(filterZoneItems('freebie', '全部', '').length, 6);

  assert.equal(filterZoneItems('graduation', '数码电器', '').length, 3);
  assert.equal(filterZoneItems('textbook', '建筑工程', '').length, 2);
  assert.equal(filterZoneItems('freebie', '全部', '图板').length, 1);
});

test('filterProducts filters by category, campus, and search query', () => {
  const all = filterProducts(INITIAL_PRODUCTS, { categoryTab: '推荐' });
  assert.equal(all.length, 4);

  const digital = filterProducts(INITIAL_PRODUCTS, { categoryTab: '数码数码' });
  assert.equal(digital.length, 3);

  const qingyuanPickup = filterProducts(INITIAL_PRODUCTS, {
    categoryTab: '本校区自提',
    campus: '清远校区',
  });
  assert.equal(qingyuanPickup.length, 3);

  const searchIpad = filterProducts(INITIAL_PRODUCTS, { searchQuery: 'iPad' });
  assert.equal(searchIpad.length, 1);
  assert.equal(searchIpad[0].id, 'prod-ipad');
});

test('filterWantedItems filters by category and keyword', () => {
  const all = filterWantedItems(INITIAL_WANTED_ITEMS, '', '全部求购');
  assert.equal(all.length, 4);

  const dorm = filterWantedItems(INITIAL_WANTED_ITEMS, '', '宿舍生活好物');
  assert.equal(dorm.length, 2);

  const queryPot = filterWantedItems(INITIAL_WANTED_ITEMS, '电煮锅', '全部求购');
  assert.equal(queryPot.length, 1);
  assert.equal(queryPot[0].userName, '林学妹');
});

test('evaluateOfferPrice classifies bargain, within budget, and above budget', () => {
  const bargain = evaluateOfferPrice(0, 20, 30);
  assert.equal(bargain.status, 'bargain');

  const within = evaluateOfferPrice(25, 20, 30);
  assert.equal(within.status, 'within');

  const above = evaluateOfferPrice(35, 20, 30);
  assert.equal(above.status, 'above');
});

test('validatePublishForm enforces agreement, title, and valid price', () => {
  assert.equal(
    validatePublishForm({ title: '罗技鼠标', price: 38, agreed: false }).valid,
    false
  );
  assert.equal(
    validatePublishForm({ title: '', price: 38, agreed: true }).valid,
    false
  );
  assert.equal(
    validatePublishForm({ title: '罗技鼠标', price: -5, agreed: true }).valid,
    false
  );
  assert.equal(
    validatePublishForm({ title: '罗技 Pebble 静音无线鼠标', price: 38, agreed: true }).valid,
    true
  );
});

test('validateRegisterForm validates phone, 6-digit SMS code, password length, and agreement', () => {
  assert.equal(
    validateRegisterForm({
      phone: '13800138000',
      code: '123456',
      password: 'password123',
      agreed: false,
    }).valid,
    false
  );
  assert.equal(
    validateRegisterForm({
      phone: '12345',
      code: '123456',
      password: 'password123',
      agreed: true,
    }).valid,
    false
  );
  assert.equal(
    validateRegisterForm({
      phone: '13800138000',
      code: '123',
      password: 'password123',
      agreed: true,
    }).valid,
    false
  );
  assert.equal(
    validateRegisterForm({
      phone: '13800138000',
      code: '123456',
      password: 'short',
      agreed: true,
    }).valid,
    false
  );
  assert.equal(
    validateRegisterForm({
      phone: '13800138000',
      code: '123456',
      password: 'password123',
      agreed: true,
    }).valid,
    true
  );
});
