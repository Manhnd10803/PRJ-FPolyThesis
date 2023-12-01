import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

const postReport = <T>(data: any) => {
  return httpRequest.post(
    `${ApiConstants.REPORT}/${data.reported_id}/${data.report_type}/${data.report_type_id}`,
    data,
  );
};

export const ReportService = { postReport };
