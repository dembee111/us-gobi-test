const endDate = Date.parse('2020-12-13T00:00:00');
const nowDate = new Date();
const startDate = new Date('2020-12-01T00:00:00');

const prizeActiveStartTime = '09:40:00';
const prizeActiveEndTime = '23:40:00';

const hubSpotForm = {
  eu: {
    portalID: '5629226',
    formID: 'd32e0296-0d05-43b2-ab6b-e62f3673c1e0',
  },
  no: {
    portalID: '5629226',
    formID: '30f7a727-28e7-4b6b-b2be-454b98c1094a',
  },
  se: {
    portalID: '5629226',
    formID: '30a1f55d-d3ed-4dd8-a140-a882804a4409',
  },
  uk: {
    portalID: '5629226',
    formID: '20e91e52-3352-4643-9f44-16dc279aaf57',
  },
  us: {
    portalID: '5629226',
    formID: 'e04dd52b-281c-4b5d-ac71-b6f4de61ab08',
  },
  ru: {
    portalID: '5629226',
    formID: 'caba21e4-d985-4030-b07c-0ce11316a920',
  },
  fr: {
    portalID: '5629226',
    formID: '02833830-b177-4d30-a484-496e8c9e2456',
  },
};

const spinData = {
  eu: [
    { id: 1, name: '€10 off', text: '€10', coupon: 'SAVE10' },
    { id: 2, name: 'Gift Box', text: 'Gift Box', coupon: 'GIFTBOX', handle: 'luxury-gift-box' },
    { id: 3, name: '10% off', text: '10% off', coupon: 'LUCKY4' },
    { id: 4, name: '30% off', text: '30% off', coupon: 'BIGSALE' },
    { id: 5, name: 'Thank You', text: 'Thank You', coupon: 'textCoupon' },
    { id: 6, name: 'Mask', text: 'Mask', coupon: 'Mask11', handle: 'cashmere-face-mask' },
    { id: 7, name: '10% off', text: '10% off', coupon: 'LUCKY4' },
    {
      id: 8,
      name: 'Free Coat',
      text: 'GRAND PRIZE',
      data: [
        {
          isChoose: true,
          chooseTitle: 'Go ahead & Choose Your Coat',
          chooseMale: 'Men’s Coat',
          chooseFemale: 'Women’s Coat',
          handleMale: 'classic-lapel-coat-beige',
          handleFemale: 'reversible-long-coat-tradewinds',
          couponMale: 'COATGC',
          couponFemale: 'COAT1',
        },
        {
          isChoose: true,
          chooseTitle: 'Go ahead & Choose Your Coat',
          chooseMale: 'Men’s Coat',
          chooseFemale: 'Women’s Coat',
          handleMale: 'classic-lapel-coat-beige',
          handleFemale: 'reversible-long-coat-tradewinds',
          couponMale: 'MALE1',
          couponFemale: 'LUCKY1',
        },
        {
          isChoose: true,
          chooseTitle: 'Go ahead & Choose Your Coat',
          chooseMale: 'Men’s Coat',
          chooseFemale: 'Women’s Coat',
          handleMale: 'classic-lapel-coat-beige',
          handleFemale: 'reversible-long-coat-tradewinds',
          couponMale: 'WINNERS',
          couponFemale: 'LUCKY1',
        },
        {
          isChoose: true,
          chooseTitle: 'Go ahead & Choose Your Coat',
          chooseMale: 'Men’s Coat',
          chooseFemale: 'Women’s Coat',
          handleMale: 'classic-lapel-coat-beige',
          handleFemale: 'reversible-long-coat-tradewinds',
          couponMale: 'CASHMERE1',
          couponFemale: 'GOBI11',
        },
        {
          isChoose: true,
          chooseTitle: 'Go ahead & Choose Your Sweater',
          chooseMale: 'Men’s Sweater',
          chooseFemale: 'Women’s Sweater',
          handleMale: 'round-neck-sweater-black',
          handleFemale: 'round-neck-sweater-black-1',
          couponMale: 'SWEATER1',
          couponFemale: 'JUMPER9 ',
        },
        {
          isChoose: true,
          chooseTitle: 'Go ahead & Choose Your Sweater',
          chooseMale: 'Men’s Sweater',
          chooseFemale: 'Women’s Sweater',
          handleMale: 'round-neck-sweater-black',
          handleFemale: 'round-neck-sweater-black-1',
          couponMale: 'LUX11',
          couponFemale: 'LUCK11 ',
        },
        {
          isChoose: true,
          chooseTitle: 'Go ahead & Choose Your Sweater',
          chooseMale: 'Men’s Sweater',
          chooseFemale: 'Women’s Sweater',
          handleMale: 'round-neck-sweater-black',
          handleFemale: 'round-neck-sweater-black-1',
          couponMale: 'BEST11',
          couponFemale: 'GOBI14',
        },
        {
          isChoose: true,
          chooseTitle: 'Go ahead & Choose Your Sweater',
          chooseMale: 'Men’s Sweater',
          chooseFemale: 'Women’s Sweater',
          handleMale: 'round-neck-sweater-black',
          handleFemale: 'round-neck-sweater-black-1',
          couponMale: 'MALE15',
          couponFemale: 'CARE16',
        },
        {
          handle: 'super-soft-throw-off-white',
          coupon: 'BLANKET8',
        },
        {
          handle: 'super-soft-throw-off-white',
          coupon: 'WARM20',
        },
        {
          handle: 'super-soft-throw-off-white',
          coupon: 'CARE22',
        },
        {
          handle: 'super-soft-throw-off-white',
          coupon: 'SOFT24',
        },
      ],
    },
  ],
  uk: [
    { id: 1, name: '£10 off', text: '£10', coupon: 'LUCK10' },
    { id: 2, name: 'Gift Box', text: 'Gift Box', coupon: 'GIFTBOX', handle: 'luxury-gift-box' },
    { id: 3, name: '10% off', text: '10% off', coupon: 'GOBI12' },
    { id: 4, name: '30% off', text: '30% off', coupon: 'SAVE1' },
    { id: 5, name: 'Thank You', text: 'Thank You', coupon: 'textCoupon' },
    { id: 6, name: 'Mask', text: 'Mask', coupon: 'Mask11', handle: 'cashmere-face-mask' },
    { id: 7, name: '10% off', text: '10% off', coupon: 'GOBI12' },
    {
      id: 8,
      name: 'Free Coat',
      text: 'GRAND PRIZE',
      data: [
        {
          isChoose: true,
          chooseTitle: 'Go ahead & Choose Your Coat',
          chooseMale: 'Men’s Coat',
          chooseFemale: 'Women’s Coat',
          handleMale: 'classic-lapel-coat-beige',
          handleFemale: 'reversible-long-coat-tradewinds',
          couponMale: 'COATGC',
          couponFemale: 'COAT1',
        },
        {
          isChoose: true,
          chooseTitle: 'Go ahead & Choose Your Coat',
          chooseMale: 'Men’s Coat',
          chooseFemale: 'Women’s Coat',
          handleMale: 'classic-lapel-coat-beige',
          handleFemale: 'reversible-long-coat-tradewinds',
          couponMale: 'MALE1',
          couponFemale: 'LUCKY1',
        },
        {
          isChoose: true,
          chooseTitle: 'Go ahead & Choose Your Coat',
          chooseMale: 'Men’s Coat',
          chooseFemale: 'Women’s Coat',
          handleMale: 'classic-lapel-coat-beige',
          handleFemale: 'reversible-long-coat-tradewinds',
          couponMale: 'WINNERS',
          couponFemale: 'LUCKY1',
        },
        {
          isChoose: true,
          chooseTitle: 'Go ahead & Choose Your Coat',
          chooseMale: 'Men’s Coat',
          chooseFemale: 'Women’s Coat',
          handleMale: 'classic-lapel-coat-beige',
          handleFemale: 'reversible-long-coat-tradewinds',
          couponMale: 'CASHMERE1',
          couponFemale: 'GOBI11',
        },
        {
          isChoose: true,
          chooseTitle: 'Go ahead & Choose Your Sweater',
          chooseMale: 'Men’s Sweater',
          chooseFemale: 'Women’s Sweater',
          handleMale: 'round-neck-sweater-black',
          handleFemale: 'round-neck-sweater-black-1',
          couponMale: 'SWEATER1',
          couponFemale: 'JUMPER9 ',
        },
        {
          isChoose: true,
          chooseTitle: 'Go ahead & Choose Your Sweater',
          chooseMale: 'Men’s Sweater',
          chooseFemale: 'Women’s Sweater',
          handleMale: 'round-neck-sweater-black',
          handleFemale: 'round-neck-sweater-black-1',
          couponMale: 'LUX11',
          couponFemale: 'LUCK11 ',
        },
        {
          isChoose: true,
          chooseTitle: 'Go ahead & Choose Your Sweater',
          chooseMale: 'Men’s Sweater',
          chooseFemale: 'Women’s Sweater',
          handleMale: 'round-neck-sweater-black',
          handleFemale: 'round-neck-sweater-black-1',
          couponMale: 'BEST11',
          couponFemale: 'GOBI14',
        },
        {
          isChoose: true,
          chooseTitle: 'Go ahead & Choose Your Sweater',
          chooseMale: 'Men’s Sweater',
          chooseFemale: 'Women’s Sweater',
          handleMale: 'round-neck-sweater-black',
          handleFemale: 'round-neck-sweater-black-1',
          couponMale: 'MALE15',
          couponFemale: 'CARE16',
        },
        {
          handle: 'super-soft-throw-off-white',
          coupon: 'BLANKET8',
        },
        {
          handle: 'super-soft-throw-off-white',
          coupon: 'WARM20',
        },
        {
          handle: 'super-soft-throw-off-white',
          coupon: 'CARE22',
        },
        {
          handle: 'super-soft-throw-off-white',
          coupon: 'SOFT24',
        },
      ],
    },
  ],
  se: [
    { id: 1, name: '€10 off', text: '€10', coupon: 'SOFT10' },
    { id: 2, name: 'Gift Box', text: 'Gift Box', coupon: 'GIFTBOX', handle: 'luxury-gift-box' },
    { id: 3, name: '10% off', text: '10% off', coupon: 'CASHMERE1' },
    { id: 4, name: '30% off', text: '30% off', coupon: 'SAVE30' },
    { id: 5, name: 'Thank You', text: 'Thank You', coupon: 'textCoupon' },
    { id: 6, name: 'Mask', text: 'Mask', coupon: 'Mask11', handle: 'cashmere-face-mask' },
    { id: 7, name: '10% off', text: '10% off', coupon: 'CASHMERE1' },
    {
      id: 8,
      name: 'Free Coat',
      text: 'GRAND PRIZE',
      data: [
        {
          isChoose: true,
          chooseTitle: 'Go ahead & Choose Your Coat',
          chooseMale: 'Men’s Coat',
          chooseFemale: 'Women’s Coat',
          handleMale: 'classic-lapel-coat-beige',
          handleFemale: 'reversible-long-coat-tradewinds',
          couponMale: 'COAT1',
          couponFemale: 'COATGC',
        },
      ],
    },
  ],
  no: [
    { id: 1, name: '€10 off', text: '€10', coupon: 'WARM10' },
    { id: 2, name: 'Gift Box', text: 'Gift Box', coupon: 'GIFTBOX', handle: 'luxury-gift-box' },
    { id: 3, name: '10% off', text: '10% off', coupon: 'LUCK3' },
    { id: 4, name: '30% off', text: '30% off', coupon: 'SAVE123' },
    { id: 5, name: 'Thank You', text: 'Thank You', coupon: 'textCoupon' },
    { id: 6, name: 'Mask', text: 'Mask', coupon: 'Mask11', handle: 'cashmere-face-mask' },
    { id: 3, name: '10% off', text: '10% off', coupon: 'LUCK3' },
    {
      id: 8,
      name: 'Free Coat',
      text: 'GRAND PRIZE',
      data: [
        {
          isChoose: true,
          chooseTitle: 'Go ahead & Choose Your Coat',
          chooseMale: 'Men’s Coat',
          chooseFemale: 'Women’s Coat',
          handleMale: 'classic-lapel-coat-beige',
          handleFemale: 'reversible-long-coat-tradewinds',
          couponMale: 'COAT1',
          couponFemale: 'COATGC',
        },
      ],
    },
  ],
  ru: [
    { id: 1, name: 'СКИДКY НА 1000₽', text: 'СКИДКY НА 1000₽', coupon: 'ГОБИ1000' },
    {
      id: 2,
      name: 'ПОДАРОЧНЫЙ НАБОР',
      text: 'ПОДАРОЧНЫЙ НАБОР',
      coupon: 'GIFTBOX',
      handle: 'роскошная-подарочная-коробка',
    },
    { id: 3, name: 'СКИДКА НА 10%', text: 'СКИДКА НА 10%', coupon: 'УДАЧА' },
    { id: 4, name: 'СКИДКА НА 30%', text: 'СКИДКА НА 30%', coupon: 'СКИДКАБИГ' },
    { id: 5, name: 'СПАСИБО', text: 'СПАСИБО', coupon: 'textCoupon' },
    { id: 6, name: 'МАСКА', text: 'МАСКА', coupon: 'Mask11', handle: 'кашемировая-маска-голубое-голубое' },
    { id: 7, name: 'СКИДКА НА 10%', text: 'СКИДКА НА 10%', coupon: 'УДАЧА' },
    {
      id: 8,
      name: 'Пальто',
      text: 'ГЛАВНЫЙ ПРИЗ',
      data: [
        {
          isChoose: true,
          chooseTitle: 'Давай, выбери своё пальто',
          chooseMale: 'Мужское пальто',
          chooseFemale: 'Женское пальто',
          handleMale: 'классическое-пальто-с-воротником-с-лацканами-бежевый',
          handleFemale: 'двусторонное-длинное-пальто-серебристо-серый',
          couponMale: 'ПАЛЬТО1',
          couponFemale: 'ПАЛЬТОGC',
        },
        {
          isChoose: true,
          chooseTitle: 'Давай, выбери своё брюки',
          chooseMale: 'Мужское брюки',
          chooseFemale: 'Женское брюки',
          handleMale: 'мужской-свитер-черный',
          handleFemale: 'джемпер-черный',
          couponMale: 'БРЮКИ1',
          couponFemale: 'СВИТЕР1',
        },
        {
          handle: 'спортивные-брюки-прямого-кроя-песочно-коричневый-белый-с-оттенком',
          coupon: 'ПЛЕДЫ1',
        },
      ],
    },
  ],
  fr: [
    { id: 1, name: '10€ de remise ', text: '10€ de remise', coupon: 'SOFT10' },
    { id: 2, name: 'Boite Cadeau', text: 'Boite Cadeau', coupon: 'GIFTBOX', handle: 'boite-cadeau-de-luxe' },
    { id: 3, name: '10% de remise', text: '10% de remise', coupon: 'CASHMERE1' },
    { id: 4, name: '30% de remise', text: '30% de remise ', coupon: 'SAVE30' },
    { id: 5, name: 'Merci', text: 'Merci', coupon: 'textCoupon' },
    { id: 6, name: 'Masque', text: 'Masque', coupon: 'Mask11', handle: 'masque-en-cachemire-robe-blues' },
    { id: 7, name: '10% de remise', text: '10% de remise', coupon: 'CASHMERE1' },
    {
      id: 8,
      name: 'Manteau',
      text: 'GRAND PRIX',
      data: [
        {
          isChoose: true,
          chooseTitle: 'Allez, choisis ton manteau',
          chooseMale: 'Manteau pour hommes',
          chooseFemale: 'Manteau femme',
          handleMale: 'manteau-a-revers-classique-beige',
          handleFemale: 'manteau-reversible-tradewinds',
          couponMale: 'COAT1',
          couponFemale: 'COATGC',
        },
        {
          isChoose: true,
          chooseTitle: 'Allez, choisis ton manteau',
          chooseMale: 'Manteau pour hommes',
          chooseFemale: 'Manteau femme',
          handleMale: 'pull-col-rond-pour-homme-noir',
          handleFemale: 'pull-col-rond-noir',
          couponMale: 'JUMPER9',
          couponFemale: 'SWEATER1',
        },
        {
          handle: 'jeter-super-doux-blanc-casse',
          coupon: 'BLANKET8',
        },
      ],
    },
  ],
  us: [
    { id: 1, name: '$20 off', text: '$20', coupon: 'GIFT20' },
    { id: 2, name: 'Gift Box', text: 'Gift Box', coupon: 'XMASBOX', handle: 'luxury-gift-box' },
    { id: 3, name: '10% off', text: '10% off', coupon: 'XMAS10' },
    {
      id: 9,
      name: '1+1',
      text: '1+1',
      coupon: '',
      handle: '1-1',
      data: [
        {
          handle: '',
          coupon: '',
        },
      ],
    },
    { id: 5, name: 'Thank You', text: 'Thank You', coupon: 'textCoupon' },
    { id: 6, name: '30% off', text: '30% off', coupon: 'XMAS30' },
    { id: 7, name: '20% off', text: '20% off', coupon: 'XMAS20' },
    {
      id: 8,
      name: 'Grand Prize for $1',
      text: 'GRAND PRIZE',
      data: [
        {
          handle: 'the-joyeux-cardigan-black',
          coupon: 'GRANDPRIZE1',
        },
        {
          handle: 'color-blocked-hot-chocolate-sweater-bordeaux',
          coupon: 'GRANDPRIZE2',
        },
        {
          handle: 'the-no-l-crew-neck-black',
          coupon: 'GRANDPRIZE3',
        },
        {
          handle: 'the-joy-sweater-pool-blue',
          coupon: 'GRANDPRIZE4',
        },
        {
          isChoose: true,
          chooseTitle: 'Go ahead & Choose Your Coat',
          chooseMale: 'Men’s Coat',
          chooseFemale: 'Women’s Coat',
          handleMale: 'zipper-hoodie-snow-white',
          handleFemale: 'the-love-cardigan-white',
          couponMale: 'GRANDPRIZE5',
          couponFemale: 'GRANDPRIZE5',
        },
        {
          isChoose: true,
          chooseTitle: 'Go ahead & Choose Your Coat',
          chooseMale: 'Men’s Coat',
          chooseFemale: 'Women’s Coat',
          handleMale: 'mens-round-neck-sweater-bordeaux',
          handleFemale: 'round-neck-button-cardigan-red',
          couponMale: 'GRANDPRIZE6',
          couponFemale: 'GRANDPRIZE6',
        },
        {
          isChoose: true,
          chooseTitle: 'Go ahead & Choose Your Coat',
          chooseMale: 'Men’s Coat',
          chooseFemale: 'Women’s Coat',
          handleMale: 'cable-knit-crew-neck-off-white',
          handleFemale: 'cable-knit-crew-neck-beige',
          couponMale: 'GRANDPRIZE7',
          couponFemale: 'GRANDPRIZE7',
        },
        {
          isChoose: true,
          chooseTitle: 'Go ahead & Choose Your Coat',
          chooseMale: 'Men’s Coat',
          chooseFemale: 'Women’s Coat',
          handleMale: 'venice-cable-knit-sweater-black-plum',
          handleFemale: 'rib-and-pointelle-cashmere-sweater-toasted-almond',
          couponMale: 'GRANDPRIZE8',
          couponFemale: 'GRANDPRIZE8',
        },
        {
          isChoose: true,
          chooseTitle: 'Go ahead & Choose Your Coat',
          chooseMale: 'Men’s Coat',
          chooseFemale: 'Women’s Coat',
          handleMale: 'camouflage-cardigan-with-hoodie-warm-grey',
          handleFemale: 'full-zip-hoodie-toasted-almond',
          couponMale: 'GRANDPRIZE9',
          couponFemale: 'GRANDPRIZE9',
        },
        {
          isChoose: true,
          chooseTitle: 'Go ahead & Choose Your Coat',
          chooseMale: 'Men’s Coat',
          chooseFemale: 'Women’s Coat',
          handleMale: 'cashmere-cable-cardigan-arctic-ice',
          handleFemale: 'cashmere-cable-sweater-arctic-ice',
          couponMale: 'GRANDPRIZE10',
          couponFemale: 'GRANDPRIZE10',
        },
        {
          handle: 'the-joyeux-cardigan-black',
          coupon: 'GRANDPRIZE11',
        },
        {
          handle: 'color-blocked-hot-chocolate-sweater-bordeaux',
          coupon: 'GRANDPRIZE12',
        },
        {
          handle: 'the-no-l-crew-neck-black',
          coupon: 'GRANDPRIZE13',
        },
        {
          handle: 'the-joy-sweater-pool-blue',
          coupon: 'GRANDPRIZE14',
        },
        {
          isChoose: true,
          chooseTitle: 'Go ahead & Choose Your Coat',
          chooseMale: 'Men’s Coat',
          chooseFemale: 'Women’s Coat',
          handleMale: 'zipper-hoodie-snow-white',
          handleFemale: 'the-love-cardigan-white',
          couponMale: 'GRANDPRIZE15',
          couponFemale: 'GRANDPRIZE15',
        },
        {
          isChoose: true,
          chooseTitle: 'Go ahead & Choose Your Coat',
          chooseMale: 'Men’s Coat',
          chooseFemale: 'Women’s Coat',
          handleMale: 'mens-round-neck-sweater-bordeaux',
          handleFemale: 'round-neck-button-cardigan-red',
          couponMale: 'GRANDPRIZE16',
          couponFemale: 'GRANDPRIZE16',
        },
        {
          isChoose: true,
          chooseTitle: 'Go ahead & Choose Your Coat',
          chooseMale: 'Men’s Coat',
          chooseFemale: 'Women’s Coat',
          handleMale: 'cable-knit-crew-neck-off-white',
          handleFemale: 'cable-knit-crew-neck-beige',
          couponMale: 'GRANDPRIZE17',
          couponFemale: 'GRANDPRIZE17',
        },
        {
          isChoose: true,
          chooseTitle: 'Go ahead & Choose Your Coat',
          chooseMale: 'Men’s Coat',
          chooseFemale: 'Women’s Coat',
          handleMale: 'venice-cable-knit-sweater-black-plum',
          handleFemale: 'rib-and-pointelle-cashmere-sweater-toasted-almond',
          couponMale: 'GRANDPRIZE18',
          couponFemale: 'GRANDPRIZE18',
        },
        {
          isChoose: true,
          chooseTitle: 'Go ahead & Choose Your Coat',
          chooseMale: 'Men’s Coat',
          chooseFemale: 'Women’s Coat',
          handleMale: 'camouflage-cardigan-with-hoodie-warm-grey',
          handleFemale: 'full-zip-hoodie-toasted-almond',
          couponMale: 'GRANDPRIZE19',
          couponFemale: 'GRANDPRIZE19',
        },
        {
          isChoose: true,
          chooseTitle: 'Go ahead & Choose Your Coat',
          chooseMale: 'Men’s Coat',
          chooseFemale: 'Women’s Coat',
          handleMale: 'cashmere-cable-cardigan-arctic-ice',
          handleFemale: 'cashmere-cable-sweater-arctic-ice',
          couponMale: 'GRANDPRIZE20',
          couponFemale: 'GRANDPRIZE20',
        },
        {
          handle: 'the-joyeux-cardigan-black',
          coupon: 'GRANDPRIZE21',
        },
        {
          handle: 'color-blocked-hot-chocolate-sweater-bordeaux',
          coupon: 'GRANDPRIZE22',
        },
        {
          handle: 'the-no-l-crew-neck-black',
          coupon: 'GRANDPRIZE23',
        },
        {
          handle: 'the-joy-sweater-pool-blue',
          coupon: 'GRANDPRIZE24',
        },
        {
          isChoose: true,
          chooseTitle: 'Go ahead & Choose Your Coat',
          chooseMale: 'Men’s Coat',
          chooseFemale: 'Women’s Coat',
          handleMale: 'zipper-hoodie-snow-white',
          handleFemale: 'the-love-cardigan-white',
          couponMale: 'GRANDPRIZE25',
          couponFemale: 'GRANDPRIZE25',
        },
      ],
    },
  ],
};

function getDifferenceInSeconds(date1, date2) {
  var dif = date1.getTime() - date2.getTime();
  var Seconds_from_T1_to_T2 = dif / 1000;

  return Seconds_from_T1_to_T2;
}

export const getSpinData = (country) => {
  let result = {};

  if (country) {
    const rawData = spinData[country.toLowerCase()];
    result['data'] = rawData;
  }

  result['hubSpotForm'] = hubSpotForm[country.toLowerCase()];

  return result;
};

export const getRouletteData = (country) => {
  return new Promise((resolve, reject) => {
    const Http = new XMLHttpRequest();
    // const url = `http://localhost:5000/getRoulette?country=${country}`;
    const url = `https://europe-west1-gobicashmere-sizechart.cloudfunctions.net/getRoulette?country=${country}`;
    Http.open('GET', url);
    Http.send();

    Http.onreadystatechange = (e) => {
      if (Http.readyState === 4) {
        if (Http.status === 200) {
          const result = JSON.parse(Http.responseText);

          if (!result.error) {
            resolve(result);
          }
          // setSizeChartRes(JSON.parse(Http.responseText));
        }
      }
    };
  });
};

const prizeParser = (data, usedList) => {
  let resultData = [];

  if (data) {
    const Difference_In_Time = nowDate.getTime() - startDate.getTime();
    var Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));

    let resultPrizes = [];
    let totalPrizeCount = 0;

    Object.keys(data).map((val) => {
      if (val == 'gift') {
        const item = getPrizeByType(data, 'gift', 'giftDay', 'giftUsed', Difference_In_Days);
        totalPrizeCount = totalPrizeCount + item.count;
        resultPrizes.push(item);
      } else if (val == 'grand') {
        const item = getPrizeByType(data, 'grand', 'grandDay', 'grandUsed', Difference_In_Days);
        totalPrizeCount = totalPrizeCount + item.count;
        resultPrizes.push(item);
      } else if (val == 'mask') {
        const item = getPrizeByType(data, 'mask', 'maskDay', 'maskUsed', Difference_In_Days);
        totalPrizeCount = totalPrizeCount + item.count;
        resultPrizes.push(item);
      } else if (val == 'percent10') {
        const item = getPrizeByType(data, 'percent10', 'percent10Day', 'percent10Used', Difference_In_Days);
        totalPrizeCount = totalPrizeCount + item.count;
        resultPrizes.push(item);
      } else if (val == 'percent20') {
        const item = getPrizeByType(data, 'percent20', 'percent20Day', 'percent20Used', Difference_In_Days);
        totalPrizeCount = totalPrizeCount + item.count;
        resultPrizes.push(item);
      } else if (val == 'percent30') {
        const item = getPrizeByType(data, 'percent30', 'percent30Day', 'percent30Used', Difference_In_Days);
        totalPrizeCount = totalPrizeCount + item.count;
        resultPrizes.push(item);
      } else if (val == 'plus1') {
        const item = getPrizeByType(data, 'plus1', 'plus1Day', 'plus1Used', Difference_In_Days);
        totalPrizeCount = totalPrizeCount + item.count;
        resultPrizes.push(item);
      }
    });

    let rawPrizeActiveStart = nowDate.toISOString();
    rawPrizeActiveStart = new Date(
      rawPrizeActiveStart.substring(0, rawPrizeActiveStart.indexOf('T')) + 'T' + prizeActiveStartTime,
    );

    let rawPrizeActiveEnd = nowDate.toISOString();
    rawPrizeActiveEnd = new Date(
      rawPrizeActiveEnd.substring(0, rawPrizeActiveEnd.indexOf('T')) + 'T' + prizeActiveEndTime,
    );

    const thePrizeActiveSeconds = (rawPrizeActiveEnd.getTime() - rawPrizeActiveStart.getTime()) / 1000;

    if (totalPrizeCount > 0 && resultPrizes && resultPrizes.length > 0) {
      let prizeDurSec = 0;

      if (totalPrizeCount < 3) {
        prizeDurSec = thePrizeActiveSeconds / 3;
      } else {
        prizeDurSec = thePrizeActiveSeconds / totalPrizeCount;
      }

      let prizeStart = rawPrizeActiveStart.getTime() / 1000;

      for (let index = 0; index < resultPrizes.length; index++) {
        let val = resultPrizes[index];

        if (val.count > 0) {
          const difGrandTime = nowDate.getTime() - startDate.getTime();
          var difGrandDay = Math.floor(difGrandTime / (1000 * 3600 * 24));

          let rawDataIndex = 0;

          if (val.day == 1) {
            rawDataIndex = difGrandDay - 1;
          } else {
            if (difGrandDay > val.day) {
              rawDataIndex = difGrandDay / val.day - 1;
            } else if (difGrandDay == val.day) {
              rawDataIndex = 0;
            }
          }

          for (let i = 0; i < val.count; i++) {
            let rStartDate = prizeStart * 1000;
            let rEndDate = (prizeDurSec * (i + 1) + prizeStart) * 1000;

            prizeStart = rEndDate / 1000;
            const checkStartDate = new Date(rStartDate);
            const checkEndDate = new Date(rEndDate);

            const vStartDate = checkStartDate.getTime();
            const vEndDate = checkEndDate.getTime();
            const vNowDate = nowDate.getTime();

            if (vNowDate < vEndDate && vNowDate > vStartDate) {
              resultData.push({
                name: val.name,
                count: val.count,
                used: val.used,
                dataIndex: rawDataIndex,
                startDate: checkStartDate,
                endDate: checkEndDate,
              });
            }
          }
        }
      }
    }

    // checking is used
    let returnResult = [];

    if (resultData && resultData.length > 0) {
      resultData.map((val) => {
        if (usedList && usedList.length > 0) {
          const theLength = getUsedListLength(usedList, val);

          if (theLength < val.count) {
            returnResult.push(val);
          }
        } else {
          returnResult.push(val);
        }
      });

      resultData = returnResult;
    }
  }

  return resultData;
};

const getUsedListLength = (data, item) => {
  let result = 0;

  data.map((itemUsed) => {
    if (item.name == itemUsed.type) {
      result++;
    }
  });

  return result;
};

const getWheelFreqById = (id, data) => {
  let result = -1;

  if (id && data) {
    data.map((val, i) => {
      if (val.id == id) {
        result = i;
      }
    });
  }

  return result;
};

const getPrizeIdByName = (name) => {
  let result = 1;

  switch (name) {
    case 'gift':
      result = 2;
      break;
    case 'grand':
      result = 8;
      break;
    case 'percent10':
      result = 3;
      break;
    case 'percent30':
      result = 4;
      break;
    case 'mask':
      result = 6;
      break;
    case 'percent20':
      result = 8;
      break;
    case 'plus1':
      result = 9;
      break;
    default:
      break;
  }

  return result;
};

export const getPrizeNameById = (name) => {
  let result = 1;

  // { id: 2, name: 'Gift Box', text: 'Gift Box', coupon: 'GIFTBOX', handle: 'luxury-gift-box' },
  // { id: 3, name: '10% off', text: '10% off', coupon: 'LUCK3' },
  // { id: 4, name: '30% off', text: '30% off', coupon: 'SAVE123' },
  // { id: 5, name: 'Thank You', text: 'Thank You', coupon: 'textCoupon' },
  // { id: 6, name: 'Mask', text: 'Mask', coupon: 'Mask11', handle: 'cashmere-face-mask' },
  // { id: 3, name: '10% off', text: '10% off', coupon: 'LUCK3' },
  // {
  //   id: 8,

  switch (name) {
    case 2:
      result = 'gift';
      break;
    case 8:
      result = 'grand';
      break;
    case 3:
      result = 'percent10';
      break;
    case 4:
      result = 'percent30';
      break;
    case 6:
      result = 'mask';
      break;
    case 8:
      result = 'percent20';
      break;
    case 9:
      result = 'plus1';
      break;

    default:
      break;
  }

  return result;
};

const getPrizeByType = (data, type, day, used, dayDif) => {
  let theCount = 0;
  const rawDay = data[day];
  const rawDayPer = data[type];
  const rawUsed = data[used];
  let rawIndex = 0;

  if (rawDay == 1) {
    theCount = parseInt(rawDayPer);
  } else {
    if (rawDay <= dayDif) {
      const rawSelDay = dayDif % rawDay;

      if (rawSelDay == 0) {
        theCount = 1;
      }
    }
  }

  return { name: type, day: rawDay, count: theCount, used: rawUsed, dataIndex: rawIndex };
};

export const checkSpinPop = (country) => {
  return new Promise(async (resolve, reject) => {
    let dataApi = await getRouletteData(country);
    // gift: 1
    // giftDay: 12
    // giftUsed: 0
    // grand: 1
    // grandDay: 24
    // grandUsed: 0
    // mask: 1
    // maskDay: 4
    // maskUsed: 0
    // percent10: 1
    // percent10Day: 2
    // percent10Used: 0
    // percent30: 1
    // percent30Day: 24
    // percent30Used: 0

    let selSpinData = {};
    let rawFreq = [100, 0, 0, 0, 0, 0, 0, 0];

    if (dataApi && dataApi.result) {
      if (endDate > nowDate) {
        let selData = dataApi.result;
        const selUsedList = dataApi.used;

        selSpinData = getSpinData(country);

        let rawResult = prizeParser(selData, selUsedList);

        // 10 $ oos busad vyd ene if ajillana
        if (rawResult && rawResult.length > 0) {
          let firstValName = '';

          rawResult.map((val, i) => {
            if (i == 0) {
              firstValName = val.name;
            }

            // setting grandprize data
            if (val.name == 'grand') {
              selSpinData.data.map((sVal) => {
                if (sVal.id == 8) {
                  if (val.dataIndex <= selSpinData.data.length) {
                    sVal.data = sVal.data[val.dataIndex];
                  }
                }
              });
            }
          });

          selSpinData.data.map((sVal) => {
            const rawID = getPrizeIdByName(firstValName);

            if (sVal.id == rawID && rawID != 8 && rawID != 9) {
              const rawFreqIndex = getWheelFreqById(rawID, selSpinData.data);

              rawFreq = [0, 0, 0, 0, 0, 0, 0, 0];

              if (rawFreqIndex > -1) {
                rawFreq[rawFreqIndex] = 100;
              } else {
                rawFreq = [100, 0, 0, 0, 0, 0, 0, 0];
              }
            }
          });
        } else {
          rawFreq = [100, 0, 0, 0, 0, 0, 0, 0];
          // 10$ vyd ene ajillana
        }

        const spinLocData = localStorage.getItem('show_spin_pop');

        let newSpinData = {
          showed: true,
          date: nowDate,
        };

        if (spinLocData) {
          const rawSpin = JSON.parse(spinLocData);
          const oldDate = new Date(rawSpin.date);

          if (oldDate.getDay() < nowDate.getDay()) {
            localStorage.setItem('show_spin_pop', JSON.stringify(newSpinData));
            selSpinData.show = true;
          } else {
            selSpinData.show = false;
          }
        } else {
          localStorage.setItem('show_spin_pop', JSON.stringify(newSpinData));
          selSpinData.show = true;
        }
      }
    }

    // selSpinData.data.freq = rawFreq;
    selSpinData.country = country;

    resolve(selSpinData);
  });
};
