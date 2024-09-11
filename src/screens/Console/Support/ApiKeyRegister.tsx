// This file is part of MinIO Console Server
// Copyright (c) 2022 MinIO, Inc.
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
import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, FormLayout, InputBox, OnlineRegistrationIcon } from "mds";
import { useNavigate } from "react-router-dom";
import { SubnetLoginRequest, SubnetLoginResponse } from "../License/types";
import { useAppDispatch } from "../../../store";
import {
setErrorSnackMessage,
setServerNeedsRestart } from
"../../../systemSlice";
import { ErrorResponseHandler } from "../../../common/types";
import { modalStyleUtils } from "../Common/FormComponents/common/styleLibrary";
import { IAM_PAGES } from "../../../common/SecureComponent/permissions";
import GetApiKeyModal from "./GetApiKeyModal";
import RegisterHelpBox from "./RegisterHelpBox";
import api from "../../../common/api";

interface IApiKeyRegister {
  registerEndpoint: string;
}

const ApiKeyRegister = ({ registerEndpoint }: IApiKeyRegister) => {
  const navigate = useNavigate();

  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [fromModal, setFromModal] = useState(false);
  const dispatch = useAppDispatch();

  const onRegister = useCallback(() => {
    if (loading) {
      return;
    }
    setLoading(true);
    let request: SubnetLoginRequest = { apiKey };
    api.
    invoke("POST", registerEndpoint, request).
    then((resp: SubnetLoginResponse) => {
      setLoading(false);
      if (resp && resp.registered) {
        dispatch(setServerNeedsRestart(true));
        navigate(IAM_PAGES.LICENSE);
      }
    }).
    catch((err: ErrorResponseHandler) => {
      dispatch(setErrorSnackMessage(err));
      setLoading(false);
      reset();
    });
  }, [apiKey, dispatch, loading, registerEndpoint, navigate]);

  useEffect(() => {
    if (fromModal) {
      onRegister();
    }
  }, [fromModal, onRegister]);

  const reset = () => {
    setApiKey("");
    setFromModal(false);
  };

  return (
    <FormLayout
    title={t("Register cluster with API key")}
    icon={<OnlineRegistrationIcon />}
    containerPadding={false}
    withBorders={false}
    helpBox={<RegisterHelpBox />}>
      
      <Box
      sx={{
        fontSize: 14,
        display: "flex",
        flexFlow: "column",
        marginBottom: "30px"
      }}>{t("Use your MinIO Subscription Network API Key to register this cluster.")}


      </Box>
      <Box
      sx={{
        flex: "1"
      }}>
        
        <InputBox
        id="api-key"
        name="api-key"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        setApiKey(event.target.value)}

        label={t("API Key")}
        value={apiKey} />
        

        <Box sx={modalStyleUtils.modalButtonBar}>
          <Button
          id={"get-from-subnet"}
          variant="regular"
          disabled={loading}
          onClick={() => setShowApiKeyModal(true)}
          label={t("Get from SUBNET")} />
          
          <Button
          id={"register"}
          type="submit"
          variant="callAction"
          disabled={loading || apiKey.trim().length === 0}
          onClick={() => onRegister()}
          label={t("Register")} />
          
        </Box>
      </Box>
      <GetApiKeyModal
      open={showApiKeyModal}
      closeModal={() => setShowApiKeyModal(false)}
      onSet={(value) => {
        setApiKey(value);
        setFromModal(true);
      }} />
      
    </FormLayout>);

};

export default ApiKeyRegister;