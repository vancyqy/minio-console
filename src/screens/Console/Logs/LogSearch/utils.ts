// This file is part of MinIO Console Server
// Copyright (c) 2021 MinIO, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
import { t } from "i18next";
export const LogSearchColumnLabels = {
  time: t("Timestamp"),
  api_name: t("API Name"),
  access_key: t("Access Key"),
  bucket: t("Bucket"),
  object: t("Object"),
  remote_host: t("Remote Host"),
  request_id: t("Request ID"),
  user_agent: t("User Agent"),
  response_status: t("Response Status"),
  response_status_code: t("Response Status Code"),
  request_content_length: t("Request Content Length"),
  response_content_length: t("Response Content Length"),
  time_to_response_ns: t("Time to Response NS"),
};
