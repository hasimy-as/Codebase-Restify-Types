import wrapper from './wrapper';

export const sendResponse = async (result: any, res: any) => {
  if (result.err) {
    wrapper.response(res, 'fail', result);
  } else {
    wrapper.response(
      res,
      'success',
      result,
      'Request Processed Completely',
    );
  }
};
