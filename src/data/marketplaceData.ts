export type ScreenId =
  | 'home'
  | 'campus'
  | 'wanted'
  | 'publish'
  | 'messages'
  | 'profile'
  | 'favorites'
  | 'selling'
  | 'sold'
  | 'purchased'
  | 'meetup'
  | 'guide'
  | 'support'
  | 'detail'
  | 'freshman'
  | 'graduation'
  | 'textbook'
  | 'freebie'
  | 'respond'
  | 'chat'
  | 'settings'
  | 'register';

export type ZoneId = 'graduation' | 'freshman' | 'textbook' | 'freebie';

export interface ProductItem {
  id: string;
  title: string;
  detailTitle?: string;
  price: number;
  originalPrice?: number;
  detailPrice?: number;
  image: string;
  detailImage?: string;
  condition: string;
  campus: '清远校区' | '广州校区';
  location: string;
  timeAgo: string;
  category: '数码数码' | '图书课本' | '寝室百货' | '免费互助';
  freshmanCategory?: string;
  zone?: '毕业清仓' | '新生专区' | '教材课件' | '免费互助';
  sellerName: string;
  sellerAvatar: string;
  sellerTag: string;
  sellerRating: string;
  highlights: {
    icon: string;
    label: string;
    desc: string;
  }[];
  favorited?: boolean;
}

export interface WantedItem {
  id: string;
  userSurname: string;
  userName: string;
  userDept: string;
  avatarBg: string;
  avatarText: string;
  timeAgo: string;
  title: string;
  shortNeed: string;
  budgetText: string;
  budgetMin: number;
  budgetMax: number;
  recommendedPrice: number;
  location: string;
  campus: string;
  description: string;
  category: '建筑与工程绘图' | '宿舍生活好物' | '教材与考证' | '数码配件';
}

export interface ChatMessage {
  id: string;
  sender: 'them' | 'me' | 'meetup' | 'payment';
  text?: string;
  time: string;
  status?: string;
  imageUrl?: string;
  imageTag?: string;
  voiceSeconds?: number;
  meetupInfo?: {
    time: string;
    location: string;
    amount: number;
    state: string;
  };
  paymentInfo?: {
    amount: number;
    itemTitle: string;
    method: string;
    verified: boolean;
  };
}

export interface ConversationItem {
  id: string;
  userName: string;
  userBadge: string;
  badgeBg: string;
  badgeText: string;
  onlineText: string;
  avatar: string;
  unreadCount: number;
  lastMessage: string;
  timeAgo: string;
  statusTag: string;
  statusType: 'negotiating' | 'replied' | 'waiting' | 'official';
  productId?: string;
  productTitle?: string;
  productSubtitle?: string;
  productCondition?: string;
  productPrice?: number;
  productOriginalPrice?: number;
  productThumb?: string;
  messages: ChatMessage[];
}

export const HOTLINK_IMAGES = {
  mouse1:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDJ3ZOI6_O19tCdOZx2bUmfhrzHZtl29u9pyggJB6IItwhi1yHJehJ0BAEzKRx_cnjqGQDtTK_zs1oEhnw9zlDpfCQq3ZHwptqy3B-rMOUzMikYa9LMCGdjDoelFUxzzf136D3Wt7l9WpYd8Vp1zL-jjiuTESx3devaRi2njxjq_kX-NBhkCo9w-mA32PXGaSLJgsTZ1ernocUTPtSNksg9OjCYRG6JgJUNFjLyx9e-Ns45qKp_SiY4',
  mouse2:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBjR4kZF_EpSD9lz0QdPWyhfXtLmqUrVaRpFUu4ppjVBn8YQDE5JlBHBBpzbZg9wmNVdkqxLxqkSFNoZotq8YYHgQtRcsP_ywChDnZ4e-UDWEy4_F_-BUfsddUxmmQRgPoHP3aHblYUBY-P9rtvWkrDikJlQB560szWPTj-bpGUnF27Zz9DtwpTmGsq7NUr4Sba9COtix9xOPoqtAhI_Wk2JZ2rTuUa7COOFNEUK9dzLSv3StAIIQjV',
  cookerMatched:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAxYmn7rLNi_Brggi7TaTo62Zb1d-lwJi5Q0ow_M2J9meu88aG7KVgQrifcsg4cXfcfpuvitz06BBkdLy46BXdAyjWJDOx54E1N1Yk2lZfcfRmqASjNHWR4hmumdS5jyeWulieyOWGFaZfYsiMWmy3pBbPSYdi-pstsb5keMYvuphitWyHKOTXsDH0s81_3PHur95HrD_-FyqTMOtC4UqaGx0Rq0BhoOB4-3gNiznAiF0qSo9Sx2DMP',
  profileAvatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBCJW4ti-Q0Ncy_0MeaiozpOWwSIlM6vhhvKKnT8Mc6n_8L5luB7qalgetb6Fs8jg025l-NhwEDRoeFem9V-aJfDLDen2G32ZYQr3w75OHbUMt1g_6j6JsCWPy-aLzUF1mYQPapnicqO9DTalKf9wQlby2zMaxcaMNcLxDp-LiqqfsFpZyvvPvYhdjMqS9VZoleSupvPF37IxVHWnLiNlUjLRcBybf1n0zV_RPVE4EYmwnryxCmAxrdhXvm5fSjRl9pzG_J5o0xNLCdpA',
  avatarChen:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAlogX9HOJALQFKwhHL8rsB8gM_qILTy7F5SOdxl6iSFtSVWuXfgQbirTJ8G30fnGk_6XERnOqFy_aYG8VRdZ3fit63rls02LMdDbHjf0MzTVLAkuvV5quN6epOLWIxymURzVMDvYSKWIae3ph8YU1_RWjR_nlggSBmgrvKOG2TOaDXBTzN7nzrjzweQ9wDVD7MiqBrVtY-gr7CwPCjVh0IvSz-4mDegn94TkABHv-sF2NpjriEMhcF9XvdGQGDBb4d66kREEnKmje54Q',
  ipadThumb:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDLTJulqMeNDRTTRLGQ89N_4hm9qV2HtQnCiM1oM5Q2ruHqxProZCYq_WrnJVlCyb8PQxHJztUxQpPgGJV6G73lTzAUxNECMCkXcqBv6Zz7qD7D79nWK8SphTNuasfTbVY3l530kxFXwTKB4TLL7CP9I1btAz7RXGu0aL521ILlLIc9bWYwm70aDSgbgbYbXTkeYKtTW9B_Xasd-gfXzWOOgkWBPt8flkPEQ3e8N1ZFz5zktiH52I7Z',
  avatarZhang:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBfly1opSKWSb1oqccFlpbV--U4KSnH0XWazq8iAAnjG5BGmfRwBuPs9jUXQrjyVT_EXly-00Jsq4YcykimMghvSOPOzpvKiLnwmTD1Wu6Uo0MGiAu1GH65RxFBi8B6er9GQxCpi9YMmjVc-5UlH1jLAQZhQHRWDvyVVyVKxmJ7R0uJOCk4T0OIbJbpWV705gdvzPwXsp_WOd3FvAaD4UJywoHZSevDQtbz8uainZzLmS9dfRm8yuRJoVPm7x44l8BdXA',
  headphoneThumb:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCAsYFqElLCIknNgw0Rc3fE78nUJjuzRlZcJ52t3hf-qRh0tQuFuoE9_qc6xOIf-fmtdiEx_aLcAkamgibR7FCorSp7z1_cWzeCZzKzCLBncm2PNcSBfG9iRhk_qgxbnkbYfXt9W6lZrVMDLnY199ocmrlbU7c-dNTtOW2O_l_tqEE2eCC8G5npVuaiDjDtjwMhfhqPbXkNuAf6Qf42RDSVpwWHUvjfVfOIQi1XnMLrLTwn8g6NGAht',
  avatarLi:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDmss1qdvfSTZBju8Ye6bP4v3RIk_0Yqwx_GOlIbFyAUR3Ut8MW0epwqPsMtXjGYnXQ8iRyc1CuLgYzKQYgPB3ULlgCL5ebztt9qZSF8VteYJUNzKOJWHOTOBkMjer5XaBGe6Ms95tYl2ciLIKvkeTAUr3ulF64YVPZURQB3qfFjcMFNCmj9pmWvoJh9JR5e10XIGzklydV1xMe-woSb-wQr2tL4pn9hgtF_MSSuGz4adlC-9Vx4Jx178GEySMn-6Uu9w',
  ipadDetailHero:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDx1A18FG-Q2qf7DfJ0Y9gd8tkQdEp88G_pmuqzkELirZq9mG_dF6AQVH2kIrJRm1xm4Ej2-an7i995sk8RuNtZ8lgzrKVp6X5dKW0Ldk1BBFeB5ryETy8Kaz_Ssb10RllucD_CYphLkEc3D4auLAgcWCzszWB8J_OIzsmN24pkywnaw66bcOg5yIP0u_xC1ExQ1iAJSKbf6tMy3tvMJWiBxSaL4_krQlM2tskf6kdT0sfibr60cSPk',
  avatarLinSenior:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuACP184yx3nvnRByptJIATuKPQLvQ_EVLF1tbfD4mEyX01WFduhGjWHJWdM5Uggsz-42-YEpa9v_-lOFG9dU9uaviqxf0u8QHOdMw_FFalH59ermv5JP9vDs_8xqMLxDIF2zkGUG2iPUY0K8-sz2KRxYSu33l8ETC5opBH4tBDSeEvv1xqrm1Y6Zs2NqDbQXgdgcZD-Zc5O9LXBAJUiWIcSYfFKXYnkhF6PRGzCh4z0gGadmkutyepuFlLUlyqaNi8fOm1pza1UHI5pOw',
  chatAvatarChen1:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDq37EHgy8E1m0iL0qpMp__rZaDAWUTDd0eNbYy7JWfFvhHjCfXHdnpPXOC3x9akf4qPN4EHNWCcfGzSESriFZERWWjAigqvYyVdlEtVGmzedpo4B0q3-XHOch25-SH6Hbp0RI6o0QGFkdDtp9IqLutlc_xWcyVFghyjRS8V8eP2wckDDWGHs38ioMBnNhnDdG8HbZwCbVGyG3xTBfe36DFm3kO7OVFw220WwAWUkQx--0MzHuUITSBOacLwXDlfb7ob5-n_EP2ywMrRg',
  chatAvatarChen2:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBxepllKkiSn17B6EF-A6HivHcJFrJFu6ncAkCo_kyvhn-7pj00Lj5tJmuSQaK_KVdL9n2PCrOFGniuHq9oHZ5XADGlHtaxOnMsUekyhTZIkItSKOnYr2pgxVzJy07JlOugF7I-IVQqESlfK8Tlc3EyBbOiK2LcJOLQdsgWheX-NGrPjq0sTqsINVfNU0JdMxXTmb-jhuDxO5ZU2STLZMgUeu6YnOMEHeNfaTdn1nIfsSEJBSzw9Esl9sdAYZdFsLDG4UJr53ZczfbcRQ',
  homeIpad:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB9IfwMzraT13Xk3FyVAy0NjMJBIWtJiWrknpRYTOqwmU7Qyk1RbxQPqlFMdgJ24JfVXISK1eoPQU-6EFAJePACxif6BdSxqXCQnqCsRGfZnKQPpTaCAiDoRg69FifqiSUD72De-SLrdUQvJ3Fv6RXpj-qO1huhI9VSvofblVBJPI5JTuHOJeERuwGA7getrIs8960kNoZ31BvbMUGJ-xIvvBzexT5I48ZXnB4KxfVckMOoxp5wiGBQ',
  homeHeadphone:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAdIKdjGtPMzxrw3338itS29IaYBwa8YAn5O7_9gyLUsHwvyMM-raG_KdUOfuqIjnDP_Mual1qJouxnDWL8nVp06MrDn7EQ3A5xakx8a-nap6-Dl9gJD0IUQIZlcVEoroonnHt5q6WGC7SspzeJIEtXasw7fpdb3T0MI1wibVCudCBEsHcTy-tTsiQqzX2Q1RFLz4d2a54mUMoRsxQpN35EhluqnS0rLaUAWls-GKaTEXJcQGmUGrpg',
  homeCooker:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCe8tJAqOOLsQr7xyU8F3WzDqgupTHJy8kfJ6Pydenmr5vCgAyFaGJ5jIfv_cqeG1pi4yUIhCz3Wzz4KH033CgBLvIkXSxEGcYWnQP5qNczKn4LV-uTZO90U7TbWTOcJUE-nbVmQUw7s3S0w3yDISc43vse3n3NAlIbFDzXaT0ttWHxGAZw8t5eVB3xVCng9lS4GXVWZDje4n_gj4m9UpCRCEvmJmnokOaowryBnrvwUumc-wMKdu0W',
  homePolaroid:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDv-ApPnsvVLdXz5a8jgoSV53TrA7ZDgb51fP3lsdww9_hP8oDfLx35Om46rJa1SPzi7blQwTOKmQr32frrlA86EXzNzlg-oHlXcpvW5_mDada05GkTSBHKg8qoKhHDmogC7gSF0YesyjKjMM5yrw5tYLNGpFadhItrwzZlyEy_-lPcIUwUzaM4QB1aM_pxGUUbpcxljBegoXaC5PXLHcIhCDKF2DHvZuArPDfY6uiSLY9j5IJshAQ3',
  freshmanCooker:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAlGDfV4Us4eKEbsuPt-7vQGdh6LuSu6MnEau2iiWIiIG1GRFWJ-9j43gVylHPUo_LPhIiBRgszLqiFnNocw2uMSwtv05micukYM1eVeabEiBKMELq6Mn07lsLrMY9dCTlWair_iUTEJZ8FrjiEHqPvfnj82WQ7gJBgJ1iKrO6P1SAWoJILxrH7AKvPziGfEAOCH0aSR3JDz7_wjHxmL9V7Eyrztm6TNjFrez1pxUjh3ZoEdKE8NRTT',
  freshmanDrawer:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDKL-DjaGc8Zs0_-KG-RINetANHJNHxUWAZ7LZaBlftdtOytUUuUq3Lx1m1ITFcL87f5Zyb_MPTkQLGd9EUHy9aDIJRd1gzLxgTmqd4FtuyQDBNrzOH48EKb-IrsW7Ti_obrPTpodHDyaNN97E9kByQ0dv6ubpfhrMhDOtGPdC7jX6umk9FIDclQiYx2Yqptx9I_7AA06RM0J34Xjio19_Wza2gP4JcoL-2gEbiYQGv3M86RC5NChRY',
  freshmanChair:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCyPtnV9ZK3JvO8wvTla9eDg21kR8vRoc3ylEFDJGX4fC-hH-fP_OoECE1LtlWjdGeqZPVx2ocFOveLJpQscyvyDmji-pNL8GnkNQ6j7ZiEtHy9czTRYooyK-Y0zXO1tjL9KcnYsh1ux2Be7PnfNfmftdx8j-P1acRIQEdpEw9lcwuC6WzBrQq4_6geJRGsIjMJhUQgZA52ntZCa9ktDs2XQ-7zAE8m1pctiowC1MR30CNiS1YqYJQN',
  freshmanFan:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAYO7ju0_gh_PC1XJTRkbS7TcU7dLuZZU1IKsu5nDYPvKPm4ndnVZLDb6_v1GKqvS21xI1Kmr5SgqkVFxQBI28jF5DDFKM0rmdCQDT5eToaA4e6Ht7Q_f0NwmBm2CZurO9Us7R29o3lW4-99OOMKTkLsxzo_b-bdk7px9R59jNRge-5qkd0g28y7JtrX9ZLJIABoJyE7LhJnFNGt5dVIiBoEtq4iBADTGfTIiIeCwweETaTR5xfIvW1',
  freshmanBike:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAPB3-36Z_eEn5Wdb3byeHGO9WqKxHJcFqWVF7cYM2qCUF0Azv4uh-yPNv_xYtae_6wUzWzzWcf7gsycBDZT6TmKWiQdLKCrLgUSGpsmxDVI9o8NcI9eHI467t8Iaat5vi9NJqYzNrHmGiZfIXxhOLy5EUeVvTG_jRDzlIx91YIslKocsRFwlGHiuQliOdiM2wQP_tnwpocsdd401VCuZX9zt8QxtYL4g1J-GYU6n-wcBVRhe4yOFoO',
};

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-ipad',
    title: '自用考研iPad 9代 64G银色 无拆修带电容笔',
    detailTitle: '考研自出 iPad Air 5 64G + Pencil 2代',
    price: 1350,
    detailPrice: 3199,
    originalPrice: 1599,
    image: HOTLINK_IMAGES.homeIpad,
    detailImage: HOTLINK_IMAGES.ipadDetailHero,
    condition: '95新',
    campus: '清远校区',
    location: '清远校区 · 桂园自提',
    timeAgo: '2小时前',
    category: '数码数码',
    zone: '教材课件',
    sellerName: '林学长',
    sellerAvatar: HOTLINK_IMAGES.avatarLinSenior,
    sellerTag: '建院已认证',
    sellerRating: '信誉极好 · 历史全5星好评',
    highlights: [
      {
        icon: 'battery_charging_full',
        label: '电池健康 92%',
        desc: '仅考研期间在图书馆看网课，无暗病无磕碰',
      },
      {
        icon: 'stylus_note',
        label: '附赠原装配件',
        desc: '包含 Apple Pencil 2代（带原盒）及已贴磁吸类纸膜',
      },
      {
        icon: 'location_on',
        label: '建议面交地点',
        desc: '华南建院清远校区图文信息中心 / 桂香园宿舍区',
      },
    ],
    favorited: false,
  },
  {
    id: 'prod-sony',
    title: '索尼WH-1000XM4头戴降噪耳机 考研自习神器',
    price: 880,
    originalPrice: 1299,
    image: HOTLINK_IMAGES.homeHeadphone,
    detailImage: HOTLINK_IMAGES.homeHeadphone,
    condition: '95新',
    campus: '广州校区',
    location: '广州校区 · 丛云路自提',
    timeAgo: '今天',
    category: '数码数码',
    zone: '毕业清仓',
    sellerName: '张同学',
    sellerAvatar: HOTLINK_IMAGES.avatarZhang,
    sellerTag: '建院已认证',
    sellerRating: '信誉极好 · 历史全5星好评',
    highlights: [
      {
        icon: 'battery_charging_full',
        label: '续航持久 30h',
        desc: '自习室考研神器，主动降噪功能完好无杂音',
      },
      {
        icon: 'inventory_2',
        label: '原装收纳盒齐全',
        desc: '附带原装飞机转接头、充电线与便携硬壳包',
      },
      {
        icon: 'location_on',
        label: '建议面交地点',
        desc: '广州校区丛云路教学楼或清远校区图书馆当面试听',
      },
    ],
    favorited: false,
  },
  {
    id: 'prod-cooker',
    title: '毕业出宿舍多功能电煮锅 煎煮两用低功率',
    price: 35,
    originalPrice: 69,
    image: HOTLINK_IMAGES.homeCooker,
    detailImage: HOTLINK_IMAGES.homeCooker,
    condition: '9成新',
    campus: '清远校区',
    location: '清远校区 · 榕园自提',
    timeAgo: '昨天',
    category: '寝室百货',
    zone: '毕业清仓',
    sellerName: '李同学',
    sellerAvatar: HOTLINK_IMAGES.avatarLi,
    sellerTag: '建院已认证',
    sellerRating: '信誉极好 · 宿舍当面验货',
    highlights: [
      {
        icon: 'bolt',
        label: '450W 宿舍不跳闸',
        desc: '专为建院宿舍限电设计，两档火力调节',
      },
      {
        icon: 'verified',
        label: '不粘涂层完好',
        desc: '附赠原装不锈钢蒸笼和木铲，无磕碰异味',
      },
      {
        icon: 'location_on',
        label: '建议面交地点',
        desc: '清远校区榕园宿舍楼下当面插电试用',
      },
    ],
    favorited: false,
  },
  {
    id: 'prod-polaroid',
    title: '富士拍立得 mini11 送3盒未拆相纸 99新',
    price: 320,
    originalPrice: 480,
    image: HOTLINK_IMAGES.homePolaroid,
    detailImage: HOTLINK_IMAGES.homePolaroid,
    condition: '99新',
    campus: '清远校区',
    location: '清远校区 · 图文信息中心',
    timeAgo: '3天前',
    category: '数码数码',
    zone: '免费互助',
    sellerName: '陈学姐',
    sellerAvatar: HOTLINK_IMAGES.avatarChen,
    sellerTag: '建院已认证',
    sellerRating: '信誉极好 · 历史全5星好评',
    highlights: [
      {
        icon: 'photo_camera',
        label: '快门闪光完好',
        desc: '社团活动拍过一次，成色几乎全新无划痕',
      },
      {
        icon: 'redeem',
        label: '送3盒未拆相纸',
        desc: '含透明保护壳、可爱的肩带与两节新电池',
      },
      {
        icon: 'location_on',
        label: '建议面交地点',
        desc: '清远校区图文信息中心大堂当面试拍验机',
      },
    ],
    favorited: true,
  },
];

export const FRESHMAN_ITEMS: ProductItem[] = [
  {
    id: 'fresh-1',
    title: '多功能电煮锅 煎煮两用',
    price: 35,
    image: HOTLINK_IMAGES.freshmanCooker,
    detailImage: HOTLINK_IMAGES.freshmanCooker,
    condition: '9成新',
    campus: '清远校区',
    location: '榕园自提',
    timeAgo: '1小时前',
    category: '寝室百货',
    freshmanCategory: '小电锅',
    sellerName: '李学姐',
    sellerAvatar: HOTLINK_IMAGES.avatarLi,
    sellerTag: '建院已认证',
    sellerRating: '信誉极好 · 历史全5星好评',
    highlights: [
      { icon: 'bolt', label: '低功率450W', desc: '建院宿舍可用不跳闸，煎煮一体' },
      { icon: 'location_on', label: '建议面交地点', desc: '清远校区榕园宿舍楼下自提' },
    ],
  },
  {
    id: 'fresh-2',
    title: '抽屉式桌面收纳盒',
    price: 18,
    image: HOTLINK_IMAGES.freshmanDrawer,
    detailImage: HOTLINK_IMAGES.freshmanDrawer,
    condition: '95新',
    campus: '清远校区',
    location: '桂园自提',
    timeAgo: '2小时前',
    category: '寝室百货',
    freshmanCategory: '桌面收纳',
    sellerName: '陈学姐',
    sellerAvatar: HOTLINK_IMAGES.avatarChen,
    sellerTag: '建院已认证',
    sellerRating: '信誉极好 · 历史全5星好评',
    highlights: [
      { icon: 'inventory_2', label: '三层大容量', desc: '透明磨砂抽屉，放文具和护肤品超整齐' },
      { icon: 'location_on', label: '建议面交地点', desc: '清远校区桂园宿舍楼下' },
    ],
  },
  {
    id: 'fresh-3',
    title: '加固金属折叠椅 带厚坐垫',
    price: 25,
    image: HOTLINK_IMAGES.freshmanChair,
    detailImage: HOTLINK_IMAGES.freshmanChair,
    condition: '9成新',
    campus: '清远校区',
    location: '桂园自提',
    timeAgo: '3小时前',
    category: '寝室百货',
    freshmanCategory: '折叠桌椅',
    sellerName: '林学长',
    sellerAvatar: HOTLINK_IMAGES.avatarLinSenior,
    sellerTag: '建院已认证',
    sellerRating: '信誉极好 · 历史全5星好评',
    highlights: [
      { icon: 'chair', label: '久坐不累', desc: '带高弹海绵软垫，可折叠收纳进床底' },
      { icon: 'location_on', label: '建议面交地点', desc: '清远校区桂园宿舍区' },
    ],
  },
  {
    id: 'fresh-4',
    title: '床头静音小夹扇 充插两用',
    price: 15,
    image: HOTLINK_IMAGES.freshmanFan,
    detailImage: HOTLINK_IMAGES.freshmanFan,
    condition: '95新',
    campus: '清远校区',
    location: '教学楼',
    timeAgo: '今天',
    category: '寝室百货',
    freshmanCategory: '床头风扇',
    sellerName: '张同学',
    sellerAvatar: HOTLINK_IMAGES.avatarZhang,
    sellerTag: '建院已认证',
    sellerRating: '信誉极好 · 历史全5星好评',
    highlights: [
      { icon: 'mode_fan', label: '三档静音风', desc: '上铺床栏可直接夹住，内置电池续航一晚' },
      { icon: 'location_on', label: '建议面交地点', desc: '清远校区教学楼或宿舍区' },
    ],
  },
  {
    id: 'fresh-5',
    title: '校内通勤代步车 刹车灵敏带车锁',
    price: 85,
    image: HOTLINK_IMAGES.freshmanBike,
    detailImage: HOTLINK_IMAGES.freshmanBike,
    condition: '9成新',
    campus: '清远校区',
    location: '桂园车棚',
    timeAgo: '昨天',
    category: '寝室百货',
    freshmanCategory: '其他',
    sellerName: '林学长',
    sellerAvatar: HOTLINK_IMAGES.avatarLinSenior,
    sellerTag: '建院已认证',
    sellerRating: '信誉极好 · 历史全5星好评',
    highlights: [
      { icon: 'pedal_bike', label: '好骑轻便', desc: '前后刹车灵敏，送密码锁和车筐' },
      { icon: 'location_on', label: '建议面交地点', desc: '桂园车棚现场试骑' },
    ],
  },
  {
    id: 'fresh-6',
    title: '头戴无线降噪耳机 宿舍自习防吵',
    price: 120,
    image: HOTLINK_IMAGES.headphoneThumb,
    detailImage: HOTLINK_IMAGES.headphoneThumb,
    condition: '95新',
    campus: '清远校区',
    location: '清远校区自提',
    timeAgo: '昨天',
    category: '数码数码',
    freshmanCategory: '其他',
    sellerName: '张同学',
    sellerAvatar: HOTLINK_IMAGES.avatarZhang,
    sellerTag: '建院已认证',
    sellerRating: '信誉极好 · 历史全5星好评',
    highlights: [
      { icon: 'headphones', label: '深度隔音', desc: '宿舍打游戏或备考复习互不打扰' },
      { icon: 'location_on', label: '建议面交地点', desc: '清远校区图文信息中心' },
    ],
  },
];

export const GRADUATION_ITEMS: ProductItem[] = [
  {
    id: 'grad-1',
    title: '索尼WH-1000XM4头戴降噪耳机',
    price: 880,
    image: HOTLINK_IMAGES.homeHeadphone,
    detailImage: HOTLINK_IMAGES.homeHeadphone,
    condition: '95新',
    campus: '广州校区',
    location: '丛云路自提',
    timeAgo: '1小时前',
    category: '数码数码',
    freshmanCategory: '数码电器',
    sellerName: '张学长',
    sellerAvatar: HOTLINK_IMAGES.avatarZhang,
    sellerTag: '建院已认证',
    sellerRating: '信誉极好 · 历史全5星好评',
    highlights: [
      { icon: 'battery_charging_full', label: '续航30h', desc: '毕业上岸急出，原装便携盒与线材齐全' },
      { icon: 'location_on', label: '建议面交地点', desc: '广州校区丛云路教学楼当面试听' },
    ],
  },
  {
    id: 'grad-2',
    title: '富士拍立得 mini11 送3盒相纸',
    price: 320,
    image: HOTLINK_IMAGES.homePolaroid,
    detailImage: HOTLINK_IMAGES.homePolaroid,
    condition: '99新',
    campus: '清远校区',
    location: '图文中心',
    timeAgo: '2小时前',
    category: '数码数码',
    freshmanCategory: '数码电器',
    sellerName: '陈学姐',
    sellerAvatar: HOTLINK_IMAGES.avatarChen,
    sellerTag: '建院已认证',
    sellerRating: '信誉极好 · 历史全5星好评',
    highlights: [
      { icon: 'photo_camera', label: '送3盒相纸', desc: '毕业整理行李挥泪转，快门闪光完好' },
      { icon: 'location_on', label: '建议面交地点', desc: '清远校区图文信息中心大堂' },
    ],
  },
  {
    id: 'grad-3',
    title: '校内通勤代步车 毕业急转送车锁',
    price: 65,
    image: HOTLINK_IMAGES.freshmanBike,
    detailImage: HOTLINK_IMAGES.freshmanBike,
    condition: '9成新',
    campus: '清远校区',
    location: '桂园车棚',
    timeAgo: '3小时前',
    category: '寝室百货',
    freshmanCategory: '代步工具',
    sellerName: '林学长',
    sellerAvatar: HOTLINK_IMAGES.avatarLinSenior,
    sellerTag: '建院已认证',
    sellerRating: '信誉极好 · 历史全5星好评',
    highlights: [
      { icon: 'pedal_bike', label: '好骑轻便', desc: '离校带不走便宜出，送密码锁和车铃' },
      { icon: 'location_on', label: '建议面交地点', desc: '清远校区桂园车棚当面试骑' },
    ],
  },
  {
    id: 'grad-4',
    title: '毕业出宿舍多功能电煮锅 煎煮两用',
    price: 28,
    image: HOTLINK_IMAGES.homeCooker,
    detailImage: HOTLINK_IMAGES.homeCooker,
    condition: '9成新',
    campus: '清远校区',
    location: '榕园自提',
    timeAgo: '今天',
    category: '寝室百货',
    freshmanCategory: '寝室带走',
    sellerName: '李学姐',
    sellerAvatar: HOTLINK_IMAGES.avatarLi,
    sellerTag: '建院已认证',
    sellerRating: '信誉极好 · 历史全5星好评',
    highlights: [
      { icon: 'bolt', label: '450W不跳闸', desc: '附赠原装蒸笼，涂层完好无粘锅' },
      { icon: 'location_on', label: '建议面交地点', desc: '清远校区榕园宿舍楼下自提' },
    ],
  },
  {
    id: 'grad-5',
    title: '加固折叠椅+三层桌面收纳打包',
    price: 30,
    image: HOTLINK_IMAGES.freshmanChair,
    detailImage: HOTLINK_IMAGES.freshmanChair,
    condition: '9成新',
    campus: '清远校区',
    location: '桂园自提',
    timeAgo: '昨天',
    category: '寝室百货',
    freshmanCategory: '打包特惠',
    sellerName: '林学长',
    sellerAvatar: HOTLINK_IMAGES.avatarLinSenior,
    sellerTag: '建院已认证',
    sellerRating: '信誉极好 · 历史全5星好评',
    highlights: [
      { icon: 'redeem', label: '两件打包价', desc: '金属折叠椅+透明三层抽屉盒一起带走' },
      { icon: 'location_on', label: '建议面交地点', desc: '清远校区桂园宿舍架空层' },
    ],
  },
  {
    id: 'grad-6',
    title: '罗技 Pebble 静音无线鼠标 珊瑚粉',
    price: 32,
    image: HOTLINK_IMAGES.mouse1,
    detailImage: HOTLINK_IMAGES.mouse1,
    condition: '95新',
    campus: '清远校区',
    location: '宿舍楼下',
    timeAgo: '昨天',
    category: '数码数码',
    freshmanCategory: '数码电器',
    sellerName: '陈学姐',
    sellerAvatar: HOTLINK_IMAGES.avatarChen,
    sellerTag: '建院已认证',
    sellerRating: '信誉极好 · 历史全5星好评',
    highlights: [
      { icon: 'mouse', label: '双模静音', desc: '蓝牙+接收器双连接，图书馆用超安静' },
      { icon: 'location_on', label: '建议面交地点', desc: '清远校区桂园宿舍区' },
    ],
  },
];

export const TEXTBOOK_ITEMS: ProductItem[] = [
  {
    id: 'book-1',
    title: '考研自用iPad 9代 含全套建筑讲义',
    price: 1350,
    image: HOTLINK_IMAGES.homeIpad,
    detailImage: HOTLINK_IMAGES.ipadDetailHero,
    condition: '95新',
    campus: '清远校区',
    location: '桂园自提',
    timeAgo: '30分钟前',
    category: '图书课本',
    freshmanCategory: '专升本考研',
    sellerName: '林学长',
    sellerAvatar: HOTLINK_IMAGES.avatarLinSenior,
    sellerTag: '建院已认证',
    sellerRating: '信誉极好 · 历史全5星好评',
    highlights: [
      { icon: 'menu_book', label: '附电子讲义', desc: '内含专升本与考研全套GoodNotes手写笔记' },
      { icon: 'location_on', label: '建议面交地点', desc: '清远校区图文信息中心当面验机' },
    ],
  },
  {
    id: 'book-2',
    title: '工程制图教材+丁字尺圆规绘图套装',
    price: 22,
    image: HOTLINK_IMAGES.freshmanDrawer,
    detailImage: HOTLINK_IMAGES.freshmanDrawer,
    condition: '95新',
    campus: '清远校区',
    location: '教学楼自提',
    timeAgo: '2小时前',
    category: '图书课本',
    freshmanCategory: '建筑工程',
    sellerName: '陈学姐',
    sellerAvatar: HOTLINK_IMAGES.avatarChen,
    sellerTag: '建院已认证',
    sellerRating: '信誉极好 · 历史全5星好评',
    highlights: [
      { icon: 'architecture', label: '建工系刚需', desc: '刻度清晰无磨损，送工程制图期末复习题' },
      { icon: 'location_on', label: '建议面交地点', desc: '清远校区教学楼或桂园自提' },
    ],
  },
  {
    id: 'book-3',
    title: '二建建筑实务教材+高频考点手写笔记',
    price: 18,
    image: HOTLINK_IMAGES.ipadThumb,
    detailImage: HOTLINK_IMAGES.ipadThumb,
    condition: '9成新',
    campus: '清远校区',
    location: '图文中心',
    timeAgo: '今天',
    category: '图书课本',
    freshmanCategory: '考证二建',
    sellerName: '张学长',
    sellerAvatar: HOTLINK_IMAGES.avatarZhang,
    sellerTag: '建院已认证',
    sellerRating: '信誉极好 · 历史全5星好评',
    highlights: [
      { icon: 'verified', label: '一次过关笔记', desc: '重点章节均已用荧光笔整理归纳' },
      { icon: 'location_on', label: '建议面交地点', desc: '清远校区图文信息中心一楼' },
    ],
  },
  {
    id: 'book-4',
    title: '建筑力学与结构全套课本 带期末重点',
    price: 15,
    image: HOTLINK_IMAGES.mouse1,
    detailImage: HOTLINK_IMAGES.mouse1,
    condition: '9成新',
    campus: '清远校区',
    location: '桂园自提',
    timeAgo: '今天',
    category: '图书课本',
    freshmanCategory: '建筑工程',
    sellerName: '李学姐',
    sellerAvatar: HOTLINK_IMAGES.avatarLi,
    sellerTag: '建院已认证',
    sellerRating: '信誉极好 · 历史全5星好评',
    highlights: [
      { icon: 'edit_note', label: '含老师划重点', desc: '随书附送三套建院历年期末复习卷' },
      { icon: 'location_on', label: '建议面交地点', desc: '清远校区桂园宿舍楼下' },
    ],
  },
  {
    id: 'book-5',
    title: '市政工程计量与计价实训教材+真题',
    price: 16,
    image: HOTLINK_IMAGES.headphoneThumb,
    detailImage: HOTLINK_IMAGES.headphoneThumb,
    condition: '95新',
    campus: '广州校区',
    location: '丛云路自提',
    timeAgo: '昨天',
    category: '图书课本',
    freshmanCategory: '市政机电',
    sellerName: '张同学',
    sellerAvatar: HOTLINK_IMAGES.avatarZhang,
    sellerTag: '建院已认证',
    sellerRating: '信誉极好 · 历史全5星好评',
    highlights: [
      { icon: 'menu_book', label: '页面干净整洁', desc: '市政工程技术专业大二必修教材' },
      { icon: 'location_on', label: '建议面交地点', desc: '广州校区第一食堂门口' },
    ],
  },
  {
    id: 'book-6',
    title: '广东专升本高数+政治历年真题卷套装',
    price: 20,
    image: HOTLINK_IMAGES.homeHeadphone,
    detailImage: HOTLINK_IMAGES.homeHeadphone,
    condition: '全新',
    campus: '清远校区',
    location: '图书馆自提',
    timeAgo: '昨天',
    category: '图书课本',
    freshmanCategory: '专升本考研',
    sellerName: '陈学姐',
    sellerAvatar: HOTLINK_IMAGES.avatarChen,
    sellerTag: '建院已认证',
    sellerRating: '信誉极好 · 历史全5星好评',
    highlights: [
      { icon: 'school', label: '全新未做', desc: '多买了一套真题模拟卷，附带详细解析册' },
      { icon: 'location_on', label: '建议面交地点', desc: '清远校区图书馆门口自提' },
    ],
  },
];

export const FREEBIE_ITEMS: ProductItem[] = [
  {
    id: 'free-1',
    title: '工程制图A2图板与三角板 考完0元送',
    price: 0,
    image: HOTLINK_IMAGES.freshmanDrawer,
    detailImage: HOTLINK_IMAGES.freshmanDrawer,
    condition: '9成新',
    campus: '清远校区',
    location: '桂园自提',
    timeAgo: '20分钟前',
    category: '免费互助',
    freshmanCategory: '绿植文具',
    sellerName: '林学长',
    sellerAvatar: HOTLINK_IMAGES.avatarLinSenior,
    sellerTag: '建院已认证',
    sellerRating: '信誉极好 · 爱心互助校友',
    highlights: [
      { icon: 'volunteer_activism', label: '0元爱心转赠', desc: '制图课结课了，送给有需要的建工系学弟学妹' },
      { icon: 'location_on', label: '建议面交地点', desc: '清远校区桂园宿舍楼下自提' },
    ],
  },
  {
    id: 'free-2',
    title: '建筑工程专升本复习笔记+思维导图',
    price: 0,
    image: HOTLINK_IMAGES.homeIpad,
    detailImage: HOTLINK_IMAGES.homeIpad,
    condition: '95新',
    campus: '清远校区',
    location: '图文中心',
    timeAgo: '1小时前',
    category: '免费互助',
    freshmanCategory: '考证笔记',
    sellerName: '陈学姐',
    sellerAvatar: HOTLINK_IMAGES.avatarChen,
    sellerTag: '建院已认证',
    sellerRating: '信誉极好 · 爱心互助校友',
    highlights: [
      { icon: 'menu_book', label: '手写高分笔记', desc: '已成功上岸，全套纸质装订讲义免费送' },
      { icon: 'location_on', label: '建议面交地点', desc: '清远校区图文信息中心大堂' },
    ],
  },
  {
    id: 'free-3',
    title: '三层桌面透明收纳抽屉 毕业免费送',
    price: 0,
    image: HOTLINK_IMAGES.freshmanChair,
    detailImage: HOTLINK_IMAGES.freshmanChair,
    condition: '9成新',
    campus: '清远校区',
    location: '榕园自提',
    timeAgo: '3小时前',
    category: '免费互助',
    freshmanCategory: '宿舍日用',
    sellerName: '李学姐',
    sellerAvatar: HOTLINK_IMAGES.avatarLi,
    sellerTag: '建院已认证',
    sellerRating: '信誉极好 · 爱心互助校友',
    highlights: [
      { icon: 'inventory_2', label: '干净无破损', desc: '已经用消毒湿巾擦拭干净，下楼自取即可' },
      { icon: 'location_on', label: '建议面交地点', desc: '清远校区榕园宿舍1号楼下' },
    ],
  },
  {
    id: 'free-4',
    title: '床头USB静音小夹扇 正常可用0元自提',
    price: 0,
    image: HOTLINK_IMAGES.freshmanFan,
    detailImage: HOTLINK_IMAGES.freshmanFan,
    condition: '9成新',
    campus: '清远校区',
    location: '教学楼',
    timeAgo: '今天',
    category: '免费互助',
    freshmanCategory: '宿舍日用',
    sellerName: '张同学',
    sellerAvatar: HOTLINK_IMAGES.avatarZhang,
    sellerTag: '建院已认证',
    sellerRating: '信誉极好 · 爱心互助校友',
    highlights: [
      { icon: 'mode_fan', label: '风力正常', desc: '换了大风扇，这个小的0元送给同校同学' },
      { icon: 'location_on', label: '建议面交地点', desc: '清远校区教学楼一楼大厅' },
    ],
  },
  {
    id: 'free-5',
    title: 'Type-C扩展坞与网线转接头 闲置送',
    price: 0,
    image: HOTLINK_IMAGES.mouse2,
    detailImage: HOTLINK_IMAGES.mouse2,
    condition: '95新',
    campus: '清远校区',
    location: '桂园自提',
    timeAgo: '昨天',
    category: '免费互助',
    freshmanCategory: '闲置数码',
    sellerName: '林学长',
    sellerAvatar: HOTLINK_IMAGES.avatarLinSenior,
    sellerTag: '建院已认证',
    sellerRating: '信誉极好 · 爱心互助校友',
    highlights: [
      { icon: 'usb', label: '宿舍连校园网用', desc: '即插即用，支持千兆网口与USB3.0' },
      { icon: 'location_on', label: '建议面交地点', desc: '清远校区桂园宿舍值班室旁' },
    ],
  },
  {
    id: 'free-6',
    title: '宿舍桌面小绿植盆栽+寝室收纳挂篮',
    price: 0,
    image: HOTLINK_IMAGES.homeCooker,
    detailImage: HOTLINK_IMAGES.homeCooker,
    condition: '95新',
    campus: '广州校区',
    location: '一食堂门口',
    timeAgo: '昨天',
    category: '免费互助',
    freshmanCategory: '绿植文具',
    sellerName: '陈学姐',
    sellerAvatar: HOTLINK_IMAGES.avatarChen,
    sellerTag: '建院已认证',
    sellerRating: '信誉极好 · 爱心互助校友',
    highlights: [
      { icon: 'eco', label: '好养活多肉', desc: '实习离校托付给有爱心的学弟学妹继续养' },
      { icon: 'location_on', label: '建议面交地点', desc: '广州校区第一食堂门口' },
    ],
  },
];

export interface ZoneConfig {
  id: ZoneId;
  title: string;
  searchPlaceholder: string;
  tabs: string[];
  items: ProductItem[];
  tipTitle: string;
  tipContent: string;
}

export const ZONE_CONFIGS: Record<ZoneId, ZoneConfig> = {
  freshman: {
    id: 'freshman',
    title: '新生专区',
    searchPlaceholder: '搜索小电锅、收纳盒、折叠椅...',
    tabs: ['全部', '小电锅', '桌面收纳', '折叠桌椅', '床头风扇'],
    items: FRESHMAN_ITEMS,
    tipTitle: '新生入住小贴士',
    tipContent:
      '建院宿舍单插座功率建议在 500W 以内，选购电锅等电器建议在宿舍楼下当面通电试用。',
  },
  graduation: {
    id: 'graduation',
    title: '毕业清仓',
    searchPlaceholder: '搜索降噪耳机、拍立得、代步车...',
    tabs: ['全部', '数码电器', '寝室带走', '代步工具', '打包特惠'],
    items: GRADUATION_ITEMS,
    tipTitle: '毕业清仓流转小贴士',
    tipContent:
      '学长学姐离校前急出好物支持多件打包议价，大件物品建议约在桂园/榕园宿舍架空层当面交接。',
  },
  textbook: {
    id: 'textbook',
    title: '教材课件',
    searchPlaceholder: '搜索工程制图、二建教材、专升本真题...',
    tabs: ['全部', '建筑工程', '市政机电', '考证二建', '专升本考研'],
    items: TEXTBOOK_ITEMS,
    tipTitle: '教材与考证资料小贴士',
    tipContent:
      '购买教材时可提前询问版本年份与是否有期末重点勾画，专业课绘图工具建议当面核对零件齐全。',
  },
  freebie: {
    id: 'freebie',
    title: '免费互助',
    searchPlaceholder: '搜索0元图板、复习笔记、宿舍日用...',
    tabs: ['全部', '考证笔记', '宿舍日用', '闲置数码', '绿植文具'],
    items: FREEBIE_ITEMS,
    tipTitle: '建院0元免费互助公约',
    tipContent:
      '免费互助专区物品均由建院同学爱心0元转赠，请按约定时间准时自提，共同维护绿色低碳互助校园。',
  },
};

export function filterZoneItems(
  zoneId: ZoneId,
  selectedCategory: string,
  searchKeyword: string
): ProductItem[] {
  const config = ZONE_CONFIGS[zoneId];
  if (!config) return [];
  return config.items.filter((item) => {
    if (
      selectedCategory !== '全部' &&
      item.freshmanCategory !== selectedCategory
    ) {
      return false;
    }
    if (searchKeyword.trim() !== '') {
      const q = searchKeyword.trim().toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q)
      );
    }
    return true;
  });
}

export const INITIAL_WANTED_ITEMS: WantedItem[] = [
  {
    id: 'want-1',
    userSurname: '周',
    userName: '周同学',
    userDept: '建工系·大一',
    avatarBg: '#EBF2F7',
    avatarText: '#3E6582',
    timeAgo: '15分钟前',
    title: '急收一套大一工程制图丁字尺+圆规套装',
    shortNeed: '求购工程制图丁字尺+圆规套装',
    budgetText: '¥25-35',
    budgetMin: 25,
    budgetMax: 35,
    recommendedPrice: 30,
    location: '清远校区 · 桂香园宿舍',
    campus: '期望清远校区自提',
    description:
      '下周制图课急用，刻度清晰无缺角就行。学长学姐考完用不上的随时可去桂香园宿舍楼下自提！',
    category: '建筑与工程绘图',
  },
  {
    id: 'want-2',
    userSurname: '林',
    userName: '林学妹',
    userDept: '机电工程',
    avatarBg: '#F3EFE9',
    avatarText: '#7A6348',
    timeAgo: '40分钟前',
    title: '收一个低功率宿舍可用小电煮锅（500W内）',
    shortNeed: '求购低功率宿舍电煮锅（500W内）',
    budgetText: '¥20-30',
    budgetMin: 20,
    budgetMax: 30,
    recommendedPrice: 25,
    location: '清远校区 · 榕香园/一食堂',
    campus: '期望清远校区自提',
    description:
      '平时煮面用，内胆涂层完好、断电保护正常就行。榕香园或一食堂门口当面通电验收。',
    category: '宿舍生活好物',
  },
  {
    id: 'want-3',
    userSurname: '张',
    userName: '张同学',
    userDept: '市政经管',
    avatarBg: '#EAF2ED',
    avatarText: '#346F4E',
    timeAgo: '2小时前',
    title: '收一辆好骑的普通校内代步单车（带车锁最佳）',
    shortNeed: '求购校内代步单车（带车锁最佳）',
    budgetText: '¥60-90',
    budgetMin: 60,
    budgetMax: 90,
    recommendedPrice: 75,
    location: '清远校区 · 图文信息中心',
    campus: '期望清远校区自提',
    description:
      '教学楼和图书馆代步用，刹车和脚踏正常即可，外观成色不挑，毕业要转出单车的同学请私信！',
    category: '宿舍生活好物',
  },
  {
    id: 'want-4',
    userSurname: '陈',
    userName: '陈学长',
    userDept: '备考专升本',
    avatarBg: '#F5ECF2',
    avatarText: '#7A3E62',
    timeAgo: '昨天',
    title: '收一台二手自用iPad（64G以上，仅听网课刷题）',
    shortNeed: '求购二手自用iPad（64G以上）',
    budgetText: '¥900-1400',
    budgetMin: 900,
    budgetMax: 1400,
    recommendedPrice: 1200,
    location: '清远/广州校区 · 当面验机',
    campus: '清远/广州校区均可自提',
    description:
      '屏幕无裂纹、电池健康85%以上即可，广州或清远校区都行，带笔一起优先，可当面在图书馆验机转款。',
    category: '数码配件',
  },
];

export const INITIAL_CONVERSATIONS: ConversationItem[] = [
  {
    id: 'conv-chen',
    userName: '陈学姐',
    userBadge: '建筑工程技术 · 25级',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-700',
    onlineText: '建筑工程  · 10分钟前在线',
    avatar: HOTLINK_IMAGES.avatarChen,
    unreadCount: 1,
    lastMessage: 'iPad保护套和电容笔都在，今晚19:00在桂园宿舍门口当面验机可以吗？',
    timeAgo: '14:20',
    statusTag: '面交地点协商中',
    statusType: 'negotiating',
    productId: 'prod-ipad',
    productTitle: '自用考研 iPad 9代 64G 银色',
    productSubtitle: '无拆修 · 含电容笔与原装保护套',
    productCondition: '95新',
    productPrice: 1350,
    productOriginalPrice: 1599,
    productThumb: HOTLINK_IMAGES.ipadThumb,
    messages: [
      {
        id: 'm1',
        sender: 'them',
        text: '同学你好！iPad 保护套和电容笔都还在，屏幕一直贴类纸膜无划痕。',
        time: '14:15',
        imageUrl: HOTLINK_IMAGES.ipadDetailHero,
        imageTag: 'iPad 屏幕与笔实拍',
      },
      {
        id: 'm2',
        sender: 'them',
        text: '今晚 19:00 在清远桂园宿舍门口当面验机可以吗？',
        time: '14:16',
      },
      {
        id: 'm3',
        sender: 'me',
        text: '学姐好，可以的！支持当场开机试运行 GoodNotes 和验电量吧？',
        time: '14:18',
        status: '已送达 · 14:18',
      },
      {
        id: 'm4',
        sender: 'them',
        text: '没问题，当面随便验～那我先帮你留着。',
        time: '14:19',
      },
      {
        id: 'm5',
        sender: 'meetup',
        time: '14:20',
        meetupInfo: {
          time: '今天 19:00',
          location: '清远校区 · 桂园宿舍正门口值班室旁',
          amount: 1350,
          state: '待赴约',
        },
      },
    ],
  },
  {
    id: 'conv-zhang',
    userName: '张同学',
    userBadge: '机电一体化 · 25级',
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-700',
    onlineText: '机电一体化 · 1小时前在线',
    avatar: HOTLINK_IMAGES.avatarZhang,
    unreadCount: 0,
    lastMessage: '学长好，降噪耳机的耳罩有掉皮磨损吗？自习室用隔音怎么样？',
    timeAgo: '昨天',
    statusTag: '已回复对方',
    statusType: 'replied',
    productId: 'prod-sony',
    productTitle: '索尼WH-1000XM4头戴降噪耳机',
    productSubtitle: '原装收纳盒齐全 · 30h续航',
    productCondition: '95新',
    productPrice: 880,
    productOriginalPrice: 1299,
    productThumb: HOTLINK_IMAGES.headphoneThumb,
    messages: [
      {
        id: 'z1',
        sender: 'them',
        text: '学长好，降噪耳机的耳罩有掉皮磨损吗？自习室用隔音怎么样？',
        time: '昨天 20:10',
      },
      {
        id: 'z2',
        sender: 'me',
        text: '耳罩蛋白皮很完整没有掉皮，图书馆和宿舍自习开降噪基本听不到周围说话声～',
        time: '昨天 20:15',
        status: '已读 · 昨天',
        imageUrl: HOTLINK_IMAGES.headphoneThumb,
        imageTag: '耳罩细节实拍',
      },
    ],
  },
  {
    id: 'conv-li',
    userName: '李同学',
    userBadge: '市政工程技术 · 25级',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-800',
    onlineText: '市政工程技术 · 刚刚在线',
    avatar: HOTLINK_IMAGES.avatarLi,
    unreadCount: 0,
    lastMessage: '同学你好，电煮锅宿舍限电能用吗？明天中午榕园门口可以面交吗？',
    timeAgo: '前天',
    statusTag: '等待确认时间',
    statusType: 'waiting',
    productId: 'prod-cooker',
    productTitle: '宿舍多功能电煮锅 450W',
    productSubtitle: '宿舍不跳闸带蒸笼 · 煎煮两用',
    productCondition: '9成新',
    productPrice: 35,
    productOriginalPrice: 69,
    productThumb: HOTLINK_IMAGES.cookerMatched,
    messages: [
      {
        id: 'l1',
        sender: 'them',
        text: '同学你好，电煮锅宿舍限电能用吗？明天中午榕园门口可以面交吗？',
        time: '前天 18:40',
      },
      {
        id: 'l2',
        sender: 'me',
        text: '450W一档宿舍完全不跳闸，内胆很干净，明天中午12:30榕园门口可以的！',
        time: '前天 18:45',
        status: '已读 · 前天',
        imageUrl: HOTLINK_IMAGES.cookerMatched,
        imageTag: '电煮锅内胆实拍',
      },
    ],
  },
  {
    id: 'conv-official',
    userName: '建院流转小助手',
    userBadge: '官方通知',
    badgeBg: 'bg-rose-50',
    badgeText: 'text-[#9C3D28]',
    onlineText: '官方安全流转助手 · 全天在线',
    avatar: '',
    unreadCount: 1,
    lastMessage: '你收藏的「富士拍立得 mini11」降价至 ¥320，教学楼支持当面自提验货！',
    timeAgo: '3天前',
    statusTag: '安全提示：校内当面验机，请勿私下提前转账',
    statusType: 'official',
    productId: 'prod-polaroid',
    productTitle: '富士拍立得 mini11 送3盒未拆相纸',
    productSubtitle: '含保护壳与肩带 · 图文中心自提',
    productCondition: '99新',
    productPrice: 320,
    productOriginalPrice: 480,
    productThumb: HOTLINK_IMAGES.homePolaroid,
    messages: [
      {
        id: 'o1',
        sender: 'them',
        text: '你收藏的「富士拍立得 mini11」降价至 ¥320，教学楼支持当面自提验货！安全提示：校内当面验机，请勿私下提前转账。',
        time: '3天前 09:00',
        imageUrl: HOTLINK_IMAGES.homePolaroid,
        imageTag: '降价提醒 · 拍立得实拍',
      },
    ],
  },
];

// Pure logic functions for unit testing & UI filtering
export function filterProducts(
  products: ProductItem[],
  options: {
    searchQuery?: string;
    categoryTab?: string;
    campus?: string;
    zone?: string;
  }
): ProductItem[] {
  return products.filter((item) => {
    if (options.zone && item.zone && item.zone !== options.zone) {
      return false;
    }
    if (options.categoryTab && options.categoryTab !== '推荐') {
      if (options.categoryTab === '本校区自提') {
        if (options.campus && item.campus !== options.campus) return false;
      } else if (item.category !== options.categoryTab) {
        return false;
      }
    }
    if (options.searchQuery && options.searchQuery.trim() !== '') {
      const q = options.searchQuery.trim().toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchLoc = item.location.toLowerCase().includes(q);
      const matchSeller = item.sellerName.toLowerCase().includes(q);
      if (!matchTitle && !matchLoc && !matchSeller) return false;
    }
    return true;
  });
}

export function filterWantedItems(
  items: WantedItem[],
  searchQuery: string,
  category: string
): WantedItem[] {
  return items.filter((item) => {
    if (category && category !== '全部求购' && item.category !== category) {
      return false;
    }
    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.trim().toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchLoc = item.location.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchLoc) return false;
    }
    return true;
  });
}

export function evaluateOfferPrice(
  price: number,
  budgetMin: number,
  budgetMax: number
): { status: 'within' | 'bargain' | 'above'; message: string } {
  if (price < budgetMin) {
    return {
      status: 'bargain',
      message: '价格超划算，诚意满满！对方一定非常惊喜',
    };
  }
  if (price <= budgetMax) {
    return {
      status: 'within',
      message: `出价在对方预期预算内（¥${budgetMin}-${budgetMax}），极易快速面交达成`,
    };
  }
  return {
    status: 'above',
    message: `出价稍高于对方预算上限（¥${budgetMax}），可留言说明成色优势`,
  };
}

export function validatePublishForm(input: {
  title: string;
  price: string | number;
  agreed: boolean;
}): { valid: boolean; error?: string } {
  if (!input.agreed) {
    return { valid: false, error: '请先勾选并同意《广东建院闲置流转自律公约》' };
  }
  if (!input.title || input.title.trim().length < 2) {
    return { valid: false, error: '请输入至少2个字的物品标题' };
  }
  const numPrice = Number(input.price);
  if (Number.isNaN(numPrice) || numPrice < 0) {
    return { valid: false, error: '请输入有效的期望价格' };
  }
  return { valid: true };
}

export function validateRegisterForm(input: {
  phone: string;
  code: string;
  password: string;
  agreed: boolean;
}): { valid: boolean; error?: string } {
  if (!input.agreed) {
    return { valid: false, error: '请先阅读并同意平台使用协议与隐私保护规则' };
  }
  const cleanPhone = input.phone.replace(/\s+/g, '');
  if (!/^1\d{10}$/.test(cleanPhone)) {
    return { valid: false, error: '请输入有效的11位常用手机号码' };
  }
  if (!/^\d{6}$/.test(input.code.trim())) {
    return { valid: false, error: '请输入6位短信验证码' };
  }
  if (input.password.length < 8 || input.password.length > 20) {
    return { valid: false, error: '请设置8-20位登录密码' };
  }
  return { valid: true };
}

export function buildWantedItem(input: {
  title: string;
  category: WantedItem['category'];
  budgetMin: number | string;
  budgetMax: number | string;
  location: string;
  campus: string;
  userDept: string;
  description: string;
  userName?: string;
}): { valid: boolean; error?: string; item?: WantedItem } {
  const cleanTitle = input.title.trim();
  if (cleanTitle.length < 2) {
    return {
      valid: false,
      error: '请填写至少2个字的求购物品名称（也可点击上方模版一键填入）',
    };
  }
  const rawMin = Number(input.budgetMin);
  const rawMax = Number(input.budgetMax);
  if (Number.isNaN(rawMin) || rawMin < 0 || Number.isNaN(rawMax) || rawMax <= 0) {
    return {
      valid: false,
      error: '请输入有效的心理预算范围',
    };
  }
  const min = Math.min(rawMin, rawMax);
  const max = Math.max(rawMin, rawMax);
  const recommendedPrice = Math.round((min + max) / 2);
  const budgetText = min === max ? `¥${min}` : `¥${min}-${max}`;
  const cleanLoc = input.location.trim() || `${input.campus} · 桂香园宿舍`;
  const cleanDesc =
    input.description.trim() ||
    '功能正常即可，支持建院宿舍楼下或食堂门口当面自提验收。';
  const name = input.userName || '嚼不断的浓痰';

  const item: WantedItem = {
    id: `want-${Date.now()}`,
    userSurname: name.slice(0, 1) || '林',
    userName: name,
    userDept: input.userDept || '建工系·实名',
    avatarBg: '#FFF5F2',
    avatarText: '#9C3D28',
    timeAgo: '刚刚',
    title: cleanTitle,
    shortNeed: cleanTitle,
    budgetText,
    budgetMin: min,
    budgetMax: max,
    recommendedPrice,
    location: cleanLoc,
    campus: `期望${input.campus}自提`,
    description: cleanDesc,
    category: input.category,
  };

  return { valid: true, item };
}

