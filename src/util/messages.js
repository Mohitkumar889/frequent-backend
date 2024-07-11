module.exports = (lang = "en") => {
  const maxLength = function (name) {
    return {
      en: `${name} exceeded the character limit!`,
    };
  };

  const required = function (name) {
    return {
      en: `${name} is required!`,
    };
  };

  const email_exist = {
    en: "Email already registered, Please change and try again!",
  };

  const success = {
    en: "success",
  };

  const Not_allow = {
    en: "Your not allow for this service!",
  };

  const failure = {
    en: "failure",
  };

  const ageRange = function (name) {
    return {
      en: `The ${name} field must be older than 14 years & Less than 99 years.`,
    };
  };

  return {
    required,
    maxLength,
    ageRange,
    failure: failure[lang],
    Not_allow: Not_allow[lang],
    success: success[lang],
    email_exist: email_exist[lang],
  };
};
