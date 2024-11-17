export const getErrorMsgFromResponse = (error: ServiceErrorResponse) => {
  let errorMsg: string;

  if (typeof error.message === 'string') {
    errorMsg = error.message;
  } else if (typeof error.message[0] === 'string') {
    errorMsg = error.message[0];
  } else {
    errorMsg = 'Ocurrio un error inesperado, intente nuevamente';
  }

  return errorMsg;
};

