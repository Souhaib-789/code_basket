export const numberFormat = number => {
    return (
      number?.slice(0, 2) +
      ' ' +
      '(' +
      number?.slice(2, 5) +
      ')' +
      ' ' +
      number?.slice(5, 8) +
      '-' +
      number?.slice(8, 12)
    );
  };
  
  export const validateEmail = email => {
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };
  
  export const validateUrl = input => {
    let regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return regex.test(input);
  };
  
  export const validatePassword = input => {
    let regex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,20}$/;
    return regex.test(input);
  };
  