const isErrorOfType = (error: string | string[], errorTypes: string[]) => {
  return errorTypes.some((type: string) => error.includes(type));
};

export default isErrorOfType;
