import moment from "moment-timezone";

import { WeekDaysList, WeekDays } from "./types";

moment.tz.setDefault("America/New_York");

type AllowedTypes = Date | number;

// tempos

export const ONE_MINUTE = 60 * 1000;

export const ONE_HOUR = 60 * ONE_MINUTE;

export const ONE_DAY = 24 * ONE_HOUR;

export const ONE_WEEK = 7 * ONE_DAY;

export const ONE_MONTH = 30 * ONE_DAY;

export const ONE_YEAR = 365 * ONE_DAY;

/**
 *
 *
 * Classe
 *
 *
 */

class Time {
  private _date: number;

  /**
   * Caso nenhum valor seja passado como parametro, a data atual será usada.
   *
   * @param initialDate Data inicial nos formatos Firebase Timestamp, Date ou number
   */
  constructor(initialDate?: AllowedTypes) {
    if (initialDate) {
      this._date = Time.convertToNumber(initialDate);
    } else {
      this._date = Time.nowNumber();
    }
  }

  // Public

  /**
   * Define uma nova data
   *
   * @param date Data em formato Numero, Date ou Firebase Timestamp
   */
  // eslint-disable-next-line accessor-pairs
  set setDate(date: AllowedTypes) {
    this._date = Time.convertToNumber(date);
  }

  /**
   * Retorna os milisegundos desdo epoch
   */
  get getMillis() {
    return this._date;
  }

  /**
   * Retorna um objeto Date
   */
  get getDate() {
    return new Date(this._date);
  }

  /**
   *
   *
   * Minutos
   *
   *
   */

  /**
   * Adiciona Minutos
   *
   * @param minutes Minutos a serem adicionadas
   */
  addMinutes(minutes: number) {
    this._date += minutes * ONE_MINUTE;

    return this;
  }

  /**
   * Remove Minutos
   *
   * @param minutes Minutos a serem removidas
   */
  removeMinutes(minutes: number) {
    this._date -= minutes * ONE_MINUTE;

    return this;
  }

  /**
   *
   *
   * Horas
   *
   *
   */

  /**
   * Adiciona Horas
   *
   * @param hours Horas a serem adicionadas
   */
  addHours(hours: number) {
    this._date += hours * ONE_HOUR;

    return this;
  }

  /**
   * Remove Horas
   *
   * @param hours Horas a serem removidas
   */
  removeHours(hours: number) {
    this._date -= hours * ONE_HOUR;

    return this;
  }

  /**
   *
   *
   * Dias
   *
   *
   */

  /**
   * Adiciona Dias
   *
   * @param days Dias a serem adicionados
   */
  addDays(days: number) {
    this._date += days * ONE_DAY;

    return this;
  }

  /**
   * Remove Dias
   *
   * @param days Dias a serem removidos
   */
  removeDays(days: number) {
    this._date -= days * ONE_DAY;

    return this;
  }

  /**
   *
   *
   * Semanas
   *
   *
   */

  /**
   * Adiciona Semanas
   *
   * @param weeks Semanas a serem adicionadas
   */
  addWeeks(weeks: number) {
    this._date += weeks * ONE_WEEK;

    return this;
  }

  /**
   * Remove Semanas
   *
   * @param weeks Semanas a serem removidas
   */
  removeWeeks(weeks: number) {
    this._date -= weeks * ONE_WEEK;

    return this;
  }

  /**
   *
   *
   * Meses
   *
   *
   */

  /**
   * Adiciona Meses
   *
   * @param months Meses a serem adicionadas
   */
  addMonths(months: number) {
    this._date += months * ONE_MONTH;

    return this;
  }

  /**
   * Remove Meses
   *
   * @param months Meses a serem removidas
   */
  removeMonths(months: number) {
    this._date -= months * ONE_MONTH;

    return this;
  }

  // Comparação

  /**
   * Verifica se é uma data posterior a data da classe
   */
  isAfter(date?: AllowedTypes) {
    return this._date > (Time.convertToNumber(date) || Time.nowNumber());
  }

  /**
   * Verifica se é uma data anterior a data da classe
   */
  isBefore(date?: AllowedTypes) {
    return this._date < (Time.convertToNumber(date) || Time.nowNumber());
  }

  /**
   * Verifica se é a mesma data da data da classe
   */
  isEqual(date?: AllowedTypes) {
    return this._date === (Time.convertToNumber(date) || Time.nowNumber());
  }

  /**
   * Verifica se 2 datas são no mesmo dia
   */
  isSameDay(date?: AllowedTypes) {
    const actualDateFormatted = Time.convertToDate(this._date);
    const dateFormated = Time.convertToDate(date);

    const isSameYear =
      actualDateFormatted.getFullYear() === dateFormated.getFullYear();

    if (!isSameYear) return false;

    const isSameMonth =
      actualDateFormatted.getMonth() === dateFormated.getMonth();

    if (!isSameMonth) return false;

    const isSameDay = actualDateFormatted.getDate() === dateFormated.getDate();

    if (!isSameDay) return false;

    return true;
  }

  // Variadas

  /**
   * Define a data como o proximo dia da semana
   * Ex: Se você quer a data da proxima segunda-feira,
   * use: getNextWeekDay("monday")
   *
   * @param weekDay Dia da Semana
   */
  getNextWeekDay(weekDay: WeekDaysList) {
    const nowMillis = this.getMillis;

    let newTime = nowMillis - (nowMillis % ONE_DAY);
    newTime -= ((this.getDate.getDay() - WeekDays[weekDay]) % 7) * ONE_DAY;
    newTime += 3 * ONE_HOUR; // Adiciona a diferença de timezone

    this._date = newTime;

    return this;
  }

  // Static

  static nowNumber() {
    return moment().valueOf();
  }

  static nowDate() {
    return moment().toDate();
  }

  static convertToNumber(date?: AllowedTypes) {
    if (!date) {
      return Time.nowNumber();
    }

    if (typeof date === "number") {
      return date;
    }

    return (date as Date).getTime();
  }

  static convertToDate(date?: AllowedTypes) {
    if (!date) {
      return Time.nowDate();
    }

    if (typeof date === "number") {
      return moment(date).toDate();
    }

    return date as Date;
  }
}

export default Time;
