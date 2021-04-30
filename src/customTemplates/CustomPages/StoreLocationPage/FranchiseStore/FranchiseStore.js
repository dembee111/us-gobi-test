import React, { useState } from 'react';
import GoogleMap from '../GoogleMap/GoogleMap';

const storesList = [
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [82.90962, 55.033516],
    },
    properties: {
      name: 'Tsum',
      phoneFormatted: '+7 9513746757',
      phone: '+7 9513746757',
      address: "Prospekt Dimitrova, 5, Novosibirsk, Novosibirskaya oblast', Russia, 630004 ",
      city: 'Novosibirsk',
      country: 'Russia',
      flagImg: {
        url: 'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_Russia.svg?v=1584581964',
        altText: 'Flag of Russia',
      },
    },
  },

  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [82.897033, 54.982352],
    },
    properties: {
      name: 'Свадебный центр',
      phoneFormatted: '+7 9139809251',
      phone: '+7 9139809251',
      address: "Ulitsa Vatutina, 28а, Novosibirsk, Novosibirskaya oblast', Russia, 630064",
      city: 'Novosibirsk',
      country: 'Russia',
      flagImg: {
        url: 'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_Russia.svg?v=1584581964',
        altText: 'Flag of Russia',
      },
    },
  },

  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [107.585005, 51.830419],
    },
    properties: {
      name: 'Магазин GOBI',
      phoneFormatted: '7 (800) 770 7261',
      phone: '7 (800) 770 7261',
      address: 'Советская улица, 3, Иркутск, Иркутская обл., Россия, 664047',
      city: 'Ulan-Ude',
      country: 'Russia',
      flagImg: {
        url: 'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_Russia.svg?v=1584581964',
        altText: 'Flag of Russia',
      },
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [104.303803, 52.277109],
    },
    properties: {
      name: 'Магазин GOBI',
      phoneFormatted: '7 (800) 770 7261',
      phone: '1133844700',
      address: 'Советская улица, 3, Иркутск, Иркутская обл. , Россия, 664047',
      city: 'Irkutsk',
      country: 'Russia',
      flagImg: {
        url: 'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_Russia.svg?v=1584581964',
        altText: 'Flag of Russia',
      },
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [37.625835, 55.766993],
    },
    properties: {
      name: 'Магазин GOBI',
      phoneFormatted: '7 (800) 770 7261',
      phone: '1136835120',
      address: 'Рождественский бульвар 9, подъезд 2, этаж 5, оф 508',
      city: 'Moscow',
      country: 'Russia',
      flagImg: {
        url: 'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_Russia.svg?v=1584581964',
        altText: 'Flag of Russia',
      },
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [37.586964, 55.775029],
    },
    properties: {
      name: 'GOBI',
      phoneFormatted: '8(499) 250-51-16',
      phone: '1135484601',
      address: 'м. Маяковская, ул. 4-ая Тверская-Ямская д.23, стр.1',
      city: 'Moscow',
      country: 'Russia',
      flagImg: {
        url: 'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_Russia.svg?v=1584581964',
        altText: 'Flag of Russia',
      },
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [37.584159, 55.748087],
    },
    properties: {
      name: 'GOBI',
      phoneFormatted: '8 (916) 685-14-52',
      phone: '1121571002',
      address: 'М. Смоленская Арбатско-Покровской линии, БЦ Смоленка, Троилинский пер. дом 3, 3 этаж',
      city: 'Moscow',
      country: 'Russia',
      flagImg: {
        url: 'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_Russia.svg?v=1584581964',
        altText: 'Flag of Russia',
      },
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [37.578885, 55.759922],
    },
    properties: {
      name: 'GOBI',
      phoneFormatted: '8 (499) 252-42-77',
      phone: '1138160902',
      address: 'М. Баррикадная/ Краснопресненская, ул. Конюшковская д.30',
      city: 'Moscow',
      country: 'Russia',
      flagImg: {
        url: 'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_Russia.svg?v=1584581964',
        altText: 'Flag of Russia',
      },
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [37.630124, 55.741208],
    },
    properties: {
      name: 'GOBI',
      phoneFormatted: '8 (985) 742-01-22',
      phone: '1147711137',
      address: 'М. Третьяковская/ Новокузнецкая, Климентовский пер. д.6',
      city: 'Moscow',
      country: 'Russia',
      flagImg: {
        url: 'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_Russia.svg?v=1584581964',
        altText: 'Flag of Russia',
      },
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [37.59445, 55.750388],
    },
    properties: {
      name: 'YAMA',
      phoneFormatted: '8 (495) 114-53-96',
      phone: '1138160908',
      address: 'Староконюшенный переулок 19 (Старый Арбат), г.Москва, РФ',
      city: 'Moscow',
      country: 'Russia',
      flagImg: {
        url: 'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_Russia.svg?v=1584581964',
        altText: 'Flag of Russia',
      },
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [49.149545, 55.794019],
    },
    properties: {
      name: 'Gobi Mongolian Cashmere',
      phoneFormatted: '8(962) 562-99-00',
      phone: '1144274142',
      address: 'ул. Николая Ершова, 1 А, Казань, Респ. Татарстан, Россия, 420045',
      city: 'Kazan, Tatarstan',
      country: 'Russia',
      flagImg: {
        url: 'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_Russia.svg?v=1584581964',
        altText: 'Flag of Russia',
      },
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [49.113795, 55.796758],
    },
    properties: {
      name: 'Gobi Mongolian Cashmere',
      phoneFormatted: '8(962) 562-99-00',
      phone: '1138958319',
      address: 'ул.Джержинского д.5, Казань, Респ.Татарстан, Россия, 420045',
      city: 'Kazan, Tatarstan',
      country: 'Russia',
      flagImg: {
        url: 'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_Russia.svg?v=1584581964',
        altText: 'Flag of Russia',
      },
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [37.531452, 55.790125],
    },
    properties: {
      name: 'Gobi Mongolian Cashmere',
      phoneFormatted: '8(926) 314-74-84',
      phone: '1126685224',
      address: 'Ходынский бульвар, 4, Москва, Россия',
      city: 'Moscow',
      country: 'Russia',
      flagImg: {
        url: 'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_Russia.svg?v=1584581964',
        altText: 'Flag of Russia',
      },
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [30.334183, 59.935285],
    },
    properties: {
      name: 'Gobi Cashmere',
      phoneFormatted: '8 (812) 449-20-42',
      phone: '1138849242',
      address: 'Невский проспект 48, Торговый дом - Пассаж',
      city: 'Saint petersburg',
      country: 'Russia',
      flagImg: {
        url: 'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_Russia.svg?v=1584581964',
        altText: 'Flag of Russia',
      },
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [28.993286, 41.04719],
    },
    properties: {
      name: 'Mongolian Cashmere Gobi',
      phoneFormatted: '+90 0212 232 8338',
      phone: '1138849242',
      address: 'Harbİye Mahallesi Abdi İPEKÇİ Caddesi Bronz Sokak No: 7D Posta Kodu: 34367 ŞİŞLİ -Istanbul, Turkey',
      city: 'Istanbul',
      country: 'Turkey',
      flagImg: {
        url: 'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_Turkey.svg?v=1584581963',
        altText: 'Flag of Turkey',
      },
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [32.809554, 39.912817],
    },
    properties: {
      name: 'Mongolian Cashmere Gobi',
      phoneFormatted: '+90 312 219 16 01',
      phone: '1138849242',
      address: 'Armada 1 , 1.kat No:136, Eskişehir Yolu No:6 06560 Söğütözü - ANKARA',
      city: 'Ankara',
      country: 'Turkey',
      flagImg: {
        url: 'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_Turkey.svg?v=1584581963',
        altText: 'Flag of Turkey',
      },
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [14.486122, 40.929765],
    },
    properties: {
      name: 'Gobi Cashmere',
      phoneFormatted: 'empty',
      phone: '1138849242',
      address: 'Via Nazionale Delle Puglie, 88 San Vitaliano (Na)',
      city: 'Naples',
      country: 'Italy',
      flagImg: {
        url: 'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_Italy.svg?v=1584581963',
        altText: 'Flag of Italy',
      },
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [14.241449, 40.833508],
    },
    properties: {
      name: 'Gobi Cashmere',
      phoneFormatted: 'empty',
      phone: '1138849242',
      address: 'Via Calabritto, 21 80121 Napoli',
      city: 'Naples',
      country: 'Italy',
      flagImg: {
        url: 'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_Italy.svg?v=1584581963',
        altText: 'Flag of Italy',
      },
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [6.779561, 51.222161],
    },
    properties: {
      name: 'Gobi',
      phoneFormatted: '+49 211 1305 67770',
      phone: '1138849242',
      address: 'Königsallee 60, 40212 Düsseldorf, Germany',
      city: 'Düsseldorf',
      country: 'Germany',
      flagImg: {
        url: 'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_Germany.svg?v=1584581963',
        altText: 'Flag of Germany',
      },
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [14.42453, 50.080407],
    },
    properties: {
      name: 'GOBI KASMIR',
      phoneFormatted: '+420 702 065 696',
      phone: '1138849242',
      address: 'GOBI KASMIR V Jámě 3, 110 00 Praha 1, Czech',
      city: 'Prague',
      country: 'Gzech Republic',
      flagImg: {
        url: 'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_the_Czech_Republic.svg?v=1584581963',
        altText: 'Flag of Gzech Republic',
      },
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [14.42453, 50.080407],
    },
    properties: {
      name: 'GOBI KASMIR',
      phoneFormatted: '+420 722 066 591',
      phone: '1138849242',
      address: 'GOBI KASMIR Maiselova 5, 110 00 Praha 1, Czech',
      city: 'Prague',
      country: 'Gzech Republic',
      flagImg: {
        url: 'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_the_Czech_Republic.svg?v=1584581963',
        altText: 'Flag of Gzech Republic',
      },
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [14.554439, 53.436678],
    },
    properties: {
      name: 'Gobi Cashmere',
      phoneFormatted: '+48 604 142 414',
      phone: '1138849242',
      address: 'Wyzwolenia str,44 71-500 Szczecin, Poland',
      city: 'Szczecin',
      country: 'Poland',
      flagImg: {
        url: 'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_Poland.svg?v=1584581964',
        altText: 'Flag of Poland',
      },
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-77.065555, 38.91212],
    },
    properties: {
      name: 'Gobi Cashmere',
      phoneFormatted: '+1 202 820 3382',
      phone: '1138849242',
      address: '1663 Wisconsin Ave NW, Washington DC 20007',
      city: 'Washington',
      country: 'United States Of America',
      flagImg: {
        url: 'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_the_United_States.svg?v=1584581963',
        altText: 'Flag of United States Of America',
      },
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [127.030207, 37.49756],
    },
    properties: {
      name: 'Gobi Korea',
      phoneFormatted: '+82 2 518 0525',
      phone: '1138849242',
      address: 'Room 201, Jinsung B/D, Abgujungro 4gil 13-9, Gangnam-gu, Seoul, South Korea',
      city: 'Seoul',
      country: 'South Korea',
      flagImg: {
        url: 'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_South_Korea.svg?v=1584581964',
        altText: 'Flag of South Korea',
      },
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [127.040197, 37.527132],
    },
    properties: {
      name: 'Gobi Korea',
      phoneFormatted: '+82 2 518 0525',
      phone: '1138849242',
      address: '843, Seolleung-ro, Gangnam-gu, Seoul, South Korea',
      city: 'Seoul',
      country: 'South Korea',
      flagImg: {
        url: 'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_South_Korea.svg?v=1584581964',
        altText: 'Flag of South Korea',
      },
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [121.484451, 31.238649],
    },
    properties: {
      name: 'Gobi Mongolain Cashmere',
      phoneFormatted: '+86 188 0033 7221',
      phone: '1138849242',
      address: 'Tianjin Rd, NanJing DongLu, Huangpu Qu, Shanghai Sh',
      city: 'Shanghai',
      country: 'China',
      flagImg: {
        url:
          'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_the_People_s_Republic_of_China.svg?v=1584581964',
        altText: 'Flag of China',
      },
    },
  },

  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [119.292696, 26.062612],
    },
    properties: {
      name: 'Gobi Mongolain Cashmere',
      phoneFormatted: '+86 135 5914 8779',
      phone: '1138849242',
      address:
        'Fujian Province, Fujian Province, Taijiang District Industrial Road, Baolong Xinhua second floor Gobi store',
      city: 'Fuzhou',
      country: 'China',
      flagImg: {
        url:
          'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_the_People_s_Republic_of_China.svg?v=1584581964',
        altText: 'Flag of China',
      },
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [119.741258, 49.209587],
    },
    properties: {
      name: 'Gobi Mongolain Cashmere',
      phoneFormatted: '+86 150 4950 4399',
      phone: '1138849242',
      address: 'Hulunbuir province, Hailaar city, Dongda street, Tianrun Caifu square, No.3-2',
      city: 'Hailaar',
      country: 'China',
      flagImg: {
        url:
          'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_the_People_s_Republic_of_China.svg?v=1584581964',
        altText: 'Flag of China',
      },
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [111.667025, 40.814323],
    },
    properties: {
      name: 'Gobi Mongolain Cashmere',
      phoneFormatted: '+86 150 4950 4399',
      phone: '1138849242',
      address:
        'Zhongshan West Road, Hohhot City, Inner Mongolia, National Shopping Center, West 3rd Floor, Cashmere District',
      city: 'Huh Hot',
      country: 'China',
      flagImg: {
        url:
          'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_the_People_s_Republic_of_China.svg?v=1584581964',
        altText: 'Flag of China',
      },
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [117.42421, 49.59431],
    },
    properties: {
      name: 'Gobi Mongolain Cashmere',
      phoneFormatted: '+86 187 4745 8506',
      phone: '1138849242',
      address: 'Hulunbuir province, Manzhouli city, China Russia Free Trade Zone, Aimin Store',
      city: 'Manzhouli',
      country: 'China',
      flagImg: {
        url:
          'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_the_People_s_Republic_of_China.svg?v=1584581964',
        altText: 'Flag of China',
      },
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [118.684692, 33.725726],
    },
    properties: {
      name: 'Gobi Mongolain Cashmere',
      phoneFormatted: '+86 135 6467 8088',
      phone: '1138849242',
      address: '3F, Shopping Center, Beijing Rd,  Si yang city, Jiang Su province',
      city: 'Si yang',
      country: 'China',
      flagImg: {
        url:
          'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_the_People_s_Republic_of_China.svg?v=1584581964',
        altText: 'Flag of China',
      },
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [118.681935, 33.715042],
    },
    properties: {
      name: 'Gobi Mongolain Cashmere',
      phoneFormatted: '+86 135 6467 8088',
      phone: '1138849242',
      address: '№ 9 Wen Meng Rd, Si yang city, Jiang Su province',
      city: 'Si yang',
      country: 'China',
      flagImg: {
        url:
          'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_the_People_s_Republic_of_China.svg?v=1584581964',
        altText: 'Flag of China',
      },
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [114.152653, 22.23911],
    },
    properties: {
      name: 'Gobi Mongolain Cashmere',
      phoneFormatted: '+852 2318 1812',
      phone: '1138849242',
      address: 'RM18-20, 17/F, Horizon Plaza, 2Lee Wing street, Ap Lei Chau, Hong Kong',
      city: 'Hong Kong',
      country: 'China',
      flagImg: {
        url:
          'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_the_People_s_Republic_of_China.svg?v=1584581964',
        altText: 'Flag of China',
      },
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [120.161288, 30.272249],
    },
    properties: {
      name: 'Gobi Mongolain Cashmere',
      phoneFormatted: '+8613661760209',
      phone: '1138849242',
      address: 'Hangzhou city, Hangzhou plaza, China',
      city: 'Hangzhou',
      country: 'China',
      flagImg: {
        url:
          'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_the_People_s_Republic_of_China.svg?v=1584581964',
        altText: 'Flag of China',
      },
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [126.6168339, 45.7719636],
    },
    properties: {
      name: 'Gobi Mongolain Cashmere',
      phoneFormatted: '+8613661760209',
      phone: '1138849242',
      address: 'Harbin city, Central plaza, China',
      city: 'Harbin',
      country: 'China',
      flagImg: {
        url:
          'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_the_People_s_Republic_of_China.svg?v=1584581964',
        altText: 'Flag of China',
      },
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [114.155897, 22.283504],
    },
    properties: {
      name: 'Gobi Mongolain Cashmere',
      phoneFormatted: '+852 2116 9858',
      phone: '1138849242',
      address: 'Man Yee Building, 68 Des Voeux Road Central, 2nd Floor, Shop 214, Central, Hong Kong',
      city: 'Hong Kong',
      country: 'China',
      flagImg: {
        url:
          'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_the_People_s_Republic_of_China.svg?v=1584581964',
        altText: 'Flag of China',
      },
    },
  },

  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [],
    },
    properties: {
      name: 'Gobi Mongolain Cashmere',
      phoneFormatted: '+86 187 4823 9888',
      phone: '1138849242',
      address: 'No.2-12 of Yukeduolan Park One-staged, Keerqin town, Keyouqianqi, Inner Mongolia, China',
      city: 'Ulanhot',
      country: 'China',
      flagImg: {
        url:
          'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_the_People_s_Republic_of_China.svg?v=1584581964',
        altText: 'Flag of China',
      },
    },
  },
];

export default function FranchiseStore() {
  const [cord, setCord] = useState({
    lat: storesList[0].geometry.coordinates[1],
    lng: storesList[0].geometry.coordinates[0],
  });
  return (
    <div className="franchise-section">
      <div className="franch-left">
        <GoogleMap cord={cord} storesList={storesList} />
      </div>
      <div className="franch-right">
        <div className="select-box-item" />
        <div className="right-section">
          <div style={{ padding: '0' }}>
            <div className="scrollbar" id="style-4">
              {storesList.map((item, index) => (
                <div
                  key={index}
                  className="franchise-list"
                  onClick={() => {
                    setCord({
                      lat: item.geometry.coordinates[1],
                      lng: item.geometry.coordinates[0],
                    });
                  }}
                >
                  <div className="franchise-list-img">
                    <img src={item.properties.flagImg.url} alt={item.properties.flagImg.altText} />
                    <div className="franchise-list-title">
                      <h1>{item.properties.country}</h1>
                    </div>
                  </div>
                  <div className="franchise-desc">
                    <h2>{item.properties.city}</h2>
                    <p>{item.properties.address}</p>
                    <span>{item.properties.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
