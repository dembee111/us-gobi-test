import axios from 'axios';
import moment from 'moment-timezone';

const apiURL = 'http://worldtimeapi.org/api/timezone/Asia/Ulaanbaatar';

//EUROPE TIME -aar eniig uurchilnu shvv ULAANBATAR EUROPE-s +7 Z   //us deer 7 oog hasna shuuuuuuuu !!!!!
const countDownStartDate = '2021-05-01T08:00';
const countDownEndDate = '2021-05-11T08:00';
const dateFormatStr = 'YYYY-MM-DDTHH:mm:ss';

// const count72seonds = 259200;
const timeZoneStr = 'Europe/Berlin';

const getDateOfUB = () => {
  return new Promise((resolve, reject) => {
    resolve(moment.tz(new Date(), timeZoneStr).format());
  });
};

//dfasdf
export const getInitDate = async () => {
  let result = null;

  const serverDate = await getDateOfUB();

  if (serverDate) {
    let todayServer = new Date(serverDate);

    result = checkValid(todayServer);
  }

  return result;
};

function checkValid(date) {
  var rawDate = new Date(date);
  var startDate = new Date(countDownStartDate);
  var endDate = new Date(countDownEndDate);

  let result = {};
  let startDif = getDifferenceInSeconds(rawDate, startDate);
  let endDif = getDifferenceInSeconds(endDate, rawDate);

  // date valid
  if (startDif > 0 && endDif > 0) {
    // var difStartSec = getDifferenceInSeconds(rawDate, startDate);
    var difEndStartSec = getDifferenceInSeconds(endDate, startDate);

    var leftDay = 0;

    const theDif = endDif;
    leftDay = Math.ceil(theDif / 86400);

    var leftSec = 0;

    if (leftDay > 0) {
      leftSec = theDif % 86400;
    } else {
      leftSec = theDif;
    }

    var selDate = secondsToHms(leftSec);
    result.nowDate = selDate;

    result.leftDay = leftDay;
    result.leftSecond = leftSec;
    result.startDate = startDate;
    result.endDate = endDate;
    result.finish = false;
  } else {
    result = null;
  }

  return result;
}

function getDifferenceInSeconds(date1, date2) {
  var dif = date1.getTime() - date2.getTime();
  var Seconds_from_T1_to_T2 = dif / 1000;

  return Seconds_from_T1_to_T2;
}

function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function secondsToDhms(delta) {
  // get total seconds between the times

  // calculate (and subtract) whole days
  var days = Math.floor(delta / 86400);
  delta -= days * 86400;

  // calculate (and subtract) whole hours
  var hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // calculate (and subtract) whole minutes
  var minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  // what's left is seconds
  var seconds = delta % 60; // in theory the modulus is not required

  return `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function checkTimer(data) {
  let theDate = {
    leftSecond: data.leftSecond,
    leftDay: data.leftDay,
    endDate: data.endDate,
    startDate: data.startDate,
    finish: data.finish,
  };

  var rawSec = theDate.leftSecond - 1;

  if (theDate.leftDay > 0) {
    if (rawSec < 1) {
      theDate.leftDay = theDate.leftDay - 1;

      if (theDate.leftDay > 0) {
        rawSec = 86400;
      } else {
        theDate.finish = true;
        theDate.leftSecond = 0;
        theDate.nowDate = '0:0:0';
      }
    }
  }

  if (theDate.finish == false) {
    theDate.leftSecond = rawSec;

    var selDate = secondsToHms(rawSec);
    theDate.nowDate = selDate;
  }

  return theDate;
}

export const formatCountDown = (data) => {
  let result = '';

  if (data) {
    let rawArr = data.split(':');

    rawArr.map((val, index) => {
      if (val.length == 1) {
        val = `0${val}`;
      }

      if (index != 2) {
        val = `${val} : `;
      }

      result = result + val;
    });
  }

  return result;
};

// 72 hourr

export const getInit72Date = async () => {
  let result = {
    nowDate: '00:00:00',
  };

  const serverDate = await getDateOfUB();

  if (serverDate) {
    let rawDate = new Date(serverDate);
    let startDate = new Date(moment.tz(countDownStartDate, timeZoneStr).format());
    let endDate = new Date(moment.tz(countDownEndDate, timeZoneStr).format());

    let startDif = getDifferenceInSeconds(rawDate, startDate);
    let endDif = getDifferenceInSeconds(endDate, rawDate);
    const count72seonds = getDifferenceInSeconds(endDate, startDate);

    // date valid
    if (startDif > 0 && endDif > 0) {
      let leftSec = count72seonds - startDif;
      let selDate = secondsToHms(leftSec);

      result.nowDate = selDate;
      result.leftSecond = leftSec;
      result.finish = false;
    } else {
      result.finish = true;
    }
  } else {
    result = null;
  }

  return result;
};

export function check72Timer(data) {
  let theDate = {
    leftSecond: data.leftSecond,
    finish: data.finish,
    nowDate: data.nowDate,
  };

  var rawSec = theDate.leftSecond - 1;

  if (rawSec > 0) {
    var selDate = secondsToHms(rawSec);
    theDate.nowDate = selDate;
    theDate.leftSecond = rawSec;
  } else {
    theDate.nowDate = '00:00:00';
    theDate.leftSecond = 0;
    theDate.finish = true;
  }

  return theDate;
}

export const format72CountDown = (data) => {
  let result = [];

  if (data) {
    let rawStr = data;
    rawStr = rawStr.replace(' ', '');
    rawStr = rawStr.replace(':', '');

    for (let index = 0; index < rawStr.length; index++) {
      const element = rawStr.substring(index, index + 1);

      if (element != ':') {
        result.push(element);
      }
    }
  }

  return result;
};
// end 72 hour

// DAY HOUR MINUTE SECOND  STARTT
export const getInitFullDate = async () => {
  let result = {
    nowDate: '00:00:00:00',
  };

  const serverDate = await getDateOfUB();

  if (serverDate) {
    let rawDate = new Date(serverDate);
    let startDate = new Date(moment.tz(countDownStartDate, timeZoneStr).format());
    let endDate = new Date(moment.tz(countDownEndDate, timeZoneStr).format());

    let startDif = getDifferenceInSeconds(rawDate, startDate);
    let endDif = getDifferenceInSeconds(endDate, rawDate);
    const count72seonds = getDifferenceInSeconds(endDate, startDate);

    // date valid
    if (startDif > 0 && endDif > 0) {
      let leftSec = count72seonds - startDif;
      let selDate = secondsToDhms(leftSec);

      result.nowDate = selDate;
      result.leftSecond = leftSec;
      result.finish = false;
    } else {
      result.finish = true;
    }
  } else {
    result = null;
  }

  return result;
};

export function checkFullTimer(data) {
  let theDate = {
    leftSecond: data.leftSecond,
    finish: data.finish,
    nowDate: data.nowDate,
  };

  var rawSec = theDate.leftSecond - 1;

  if (rawSec > 0) {
    var selDate = secondsToDhms(rawSec);
    theDate.nowDate = selDate;
    theDate.leftSecond = rawSec;
  } else {
    theDate.nowDate = '00:00:00:00';
    theDate.leftSecond = 0;
    theDate.finish = true;
  }

  return theDate;
}

export const formatFullCountDown = (data) => {
  let result = [];

  if (data) {
    let rawStr = data.split(':');
    result = rawStr;
  }
  return result;
};
// DAY HOUR MINUTE SECOND  ENDDD
