import { z } from 'zod';
import {
  MAX_COUNT_CHARS_IN_FIELD,
  MAX_COUNT_CHARS_IN_TEXTAREA_FIELD,
  MIN_COUNT_CHARS_IN_FIELD,
  MIN_COUNT_CHARS_IN_USERNAME,
} from '../constants.ts';

export function useAppForm() {
  function checkStartFromDigits(value: string) {
    return !/^\d/.test(value);
  }

  function checkContainSpaces(value: string) {
    return !/\s/.test(value);
  }

  function usernameValidation() {
    return z
      .string()
      .min(MIN_COUNT_CHARS_IN_FIELD, { message: 'Введите никнейм' })
      .min(MIN_COUNT_CHARS_IN_USERNAME, { message: 'Минимум 3 символа' })
      .max(MAX_COUNT_CHARS_IN_FIELD, { message: 'Слишком длинный никнейм' })
      .refine(checkStartFromDigits, {
        message: 'Никнейм не должен начинаться с цифры',
      })
      .refine(checkContainSpaces, {
        message: 'Поле не должно содержать пробелы',
      });
  }

  function passwordValidation() {
    return z
      .string()
      .min(MIN_COUNT_CHARS_IN_FIELD, { message: 'Введите пароль' })
      .min(MIN_COUNT_CHARS_IN_USERNAME, { message: 'Минимум 3 символа' })
      .max(MAX_COUNT_CHARS_IN_FIELD, { message: 'Слишком длинный пароль' })
      .refine(checkContainSpaces, {
        message: 'Поле не должно содержать пробелы',
      });
  }

  function firstNameValidation() {
    return z
      .string()
      .min(MIN_COUNT_CHARS_IN_FIELD, { message: 'Введите имя' })
      .min(MIN_COUNT_CHARS_IN_USERNAME, { message: 'Минимум 3 символа' })
      .max(MAX_COUNT_CHARS_IN_FIELD, { message: 'Слишком длинное имя' })
      .refine(checkStartFromDigits, {
        message: 'Имя не должно начинаться с цифры',
      })
      .refine(checkContainSpaces, {
        message: 'Поле не должно содержать пробелы',
      });
  }

  function lastNameValidation() {
    return z
      .string()
      .min(MIN_COUNT_CHARS_IN_FIELD, { message: 'Введите фамилию' })
      .min(MIN_COUNT_CHARS_IN_USERNAME, { message: 'Минимум 3 символа' })
      .max(MAX_COUNT_CHARS_IN_FIELD, { message: 'Слишком длинная фамилия' })
      .refine(checkStartFromDigits, {
        message: 'Фамилия не должна начинаться с цифры',
      })
      .refine(checkContainSpaces, {
        message: 'Поле не должно содержать пробелы',
      });
  }

  function emailValidation() {
    return z
      .string()
      .min(MIN_COUNT_CHARS_IN_FIELD, { message: 'Введите email' })
      .email({ message: 'Неверный email' })
      .max(MAX_COUNT_CHARS_IN_FIELD, { message: 'Слишком длинный email' })
      .refine(checkContainSpaces, {
        message: 'Поле не должно содержать пробелы',
      });
  }

  function phoneValidation() {
    return z.string().min(MIN_COUNT_CHARS_IN_FIELD, { message: 'Введите телефон' });
  }

  function ageValidation() {
    return z
      .string()
      .min(MIN_COUNT_CHARS_IN_FIELD, { message: 'Введите возраст' })
      .refine((value: string) => Number(value) >= 18, {
        message: 'Возраст не может быть меньше 18',
      });
  }

  function cityValidation() {
    return z.string().min(MIN_COUNT_CHARS_IN_FIELD, { message: 'Выберите город' });
  }

  function descriptionValidation() {
    return z
      .string()
      .min(MIN_COUNT_CHARS_IN_FIELD, { message: 'Обязательное поле' })
      .max(MAX_COUNT_CHARS_IN_TEXTAREA_FIELD, { message: 'Слишком длинный текст' });
  }

  function booleanValidation() {
    return z.custom(val => val === true, { message: 'Обязательный пункт' });
  }

  function travelAccessibilityValidation() {
    return z.string().min(MIN_COUNT_CHARS_IN_FIELD, { message: 'Выберите вариант' });
  }

  return {
    usernameValidation,
    passwordValidation,
    firstNameValidation,
    lastNameValidation,
    emailValidation,
    phoneValidation,
    ageValidation,
    cityValidation,
    descriptionValidation,
    booleanValidation,
    travelAccessibilityValidation,
  };
}
