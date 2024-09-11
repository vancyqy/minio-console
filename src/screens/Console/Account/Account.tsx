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
import React, { Fragment, useEffect, useState } from "react";
import {DataTable} from "mds-dist"
import {
AccountIcon,
AddIcon,
Box,
Button,
DeleteIcon,
Grid,
HelpBox,
PageLayout,
PasswordKeyIcon } from
"mds";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actionsTray } from "../Common/FormComponents/common/styleLibrary";

import ChangePasswordModal from "./ChangePasswordModal";
import SearchBox from "../Common/SearchBox";
import withSuspense from "../Common/Components/withSuspense";

import { selectSAs } from "../Configurations/utils";
import DeleteMultipleServiceAccounts from "../Users/DeleteMultipleServiceAccounts";
import EditServiceAccount from "./EditServiceAccount";

import { selFeatures } from "../consoleSlice";
import TooltipWrapper from "../Common/TooltipWrapper/TooltipWrapper";
import PageHeaderWrapper from "../Common/PageHeaderWrapper/PageHeaderWrapper";
import { api } from "api";
import { errorToHandler } from "api/errors";
import HelpMenu from "../HelpMenu";
import { ACCOUNT_TABLE_COLUMNS } from "./AccountUtils";
import { useAppDispatch } from "store";
import { ServiceAccounts } from "api/consoleApi";
import {
setErrorSnackMessage,
setHelpName,
setSnackBarMessage } from
"systemSlice";
import { usersSort } from "utils/sortFunctions";
import { SecureComponent } from "common/SecureComponent";
import {
CONSOLE_UI_RESOURCE,
IAM_PAGES,
IAM_SCOPES } from
"common/SecureComponent/permissions";

const DeleteServiceAccount = withSuspense(
React.lazy(() => import("./DeleteServiceAccount")));


const Account = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const features = useSelector(selFeatures);

  const [records, setRecords] = useState<ServiceAccounts>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectedServiceAccount, setSelectedServiceAccount] = useState<
  string | null>(
  null);
  const [changePasswordModalOpen, setChangePasswordModalOpen] =
  useState<boolean>(false);
  const [selectedSAs, setSelectedSAs] = useState<string[]>([]);
  const [deleteMultipleOpen, setDeleteMultipleOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  const userIDP = features && features.includes("external-idp") || false;

  useEffect(() => {
    fetchRecords();
  }, []);

  useEffect(() => {
    dispatch(setHelpName("accessKeys"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loading) {
      api.serviceAccounts.
      listUserServiceAccounts().
      then((res) => {
        setLoading(false);
        const sortedRows = res.data.sort(usersSort);
        setRecords(sortedRows);
      }).
      catch((res) => {
        dispatch(
        setErrorSnackMessage(
        errorToHandler(res?.error || "Error retrieving access keys")));


        setLoading(false);
      });
    }
  }, [loading, setLoading, setRecords, dispatch]);

  const fetchRecords = () => {
    setLoading(true);
  };

  const closeDeleteModalAndRefresh = (refresh: boolean) => {
    setDeleteOpen(false);

    if (refresh) {
      setSelectedSAs([]);
      fetchRecords();
    }
  };

  const closeDeleteMultipleModalAndRefresh = (refresh: boolean) => {
    setDeleteMultipleOpen(false);
    if (refresh) {
      dispatch(setSnackBarMessage(`Access keys deleted successfully.`));
      setSelectedSAs([]);
      setLoading(true);
    }
  };

  const editModalOpen = (selectedServiceAccount: string) => {
    setSelectedServiceAccount(selectedServiceAccount);
    setIsEditOpen(true);
  };

  const closePolicyModal = () => {
    setIsEditOpen(false);
    setLoading(true);
  };

  const confirmDeleteServiceAccount = (selectedServiceAccount: string) => {
    setSelectedServiceAccount(selectedServiceAccount);
    setDeleteOpen(true);
  };

  const tableActions = [
  {
    type: "view",
    onClick: (value: any) => {
      if (value) {
        editModalOpen(value.accessKey);
      }
    }
  },
  {
    type: "delete",
    onClick: (value: any) => {
      if (value) {
        confirmDeleteServiceAccount(value.accessKey);
      }
    }
  },
  {
    type: "edit",
    onClick: (value: any) => {
      if (value) {
        editModalOpen(value.accessKey);
      }
    }
  }];


  const filteredRecords = records.filter((elementItem) =>
  elementItem?.accessKey?.toLowerCase().includes(filter.toLowerCase()));


  return (
    <React.Fragment>
      {deleteOpen &&
      <DeleteServiceAccount
      deleteOpen={deleteOpen}
      selectedServiceAccount={selectedServiceAccount}
      closeDeleteModalAndRefresh={(refresh: boolean) => {
        closeDeleteModalAndRefresh(refresh);
      }} />}

      
      {deleteMultipleOpen &&
      <DeleteMultipleServiceAccounts
      deleteOpen={deleteMultipleOpen}
      selectedSAs={selectedSAs}
      closeDeleteModalAndRefresh={closeDeleteMultipleModalAndRefresh} />}

      

      {isEditOpen &&
      <EditServiceAccount
      open={isEditOpen}
      selectedAccessKey={selectedServiceAccount}
      closeModalAndRefresh={closePolicyModal} />}

      
      <ChangePasswordModal
      open={changePasswordModalOpen}
      closeModal={() => setChangePasswordModalOpen(false)} />
      
      <PageHeaderWrapper label={t("Access Keys")} actions={<HelpMenu />} />

      <PageLayout>
        <Grid container>
          <Grid item xs={12} sx={{ ...actionsTray.actionsTray }}>
            <SearchBox
            placeholder={t("Search Access Keys")}
            onChange={setFilter}
            sx={{ marginRight: "auto", maxWidth: 380 }}
            value={filter} />
            
            <Box
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              gap: 5
            }}>
              
              <TooltipWrapper tooltip={t("Delete Selected")}>
                <Button
                id={"delete-selected-accounts"}
                onClick={() => {
                  setDeleteMultipleOpen(true);
                }}
                label={t("Delete Selected")}
                icon={<DeleteIcon />}
                disabled={selectedSAs.length === 0}
                variant={"secondary"} />
                
              </TooltipWrapper>
              <SecureComponent
              scopes={[IAM_SCOPES.ADMIN_CREATE_USER]}
              resource={CONSOLE_UI_RESOURCE}
              matchAll
              errorProps={{ disabled: true }}>
                
                <Button
                id={"change-password"}
                onClick={() => setChangePasswordModalOpen(true)}
                label={`${t("Change Password")}`}
                icon={<PasswordKeyIcon />}
                variant={"regular"}
                disabled={userIDP} />
                
              </SecureComponent>
              <SecureComponent
              scopes={[IAM_SCOPES.ADMIN_CREATE_SERVICEACCOUNT]}
              resource={CONSOLE_UI_RESOURCE}
              matchAll
              errorProps={{ disabled: true }}>
                
                <Button
                id={"create-service-account"}
                onClick={() => {
                  navigate(`${IAM_PAGES.ACCOUNT_ADD}`);
                }}
                label={`${t("Create access key")}`}
                icon={<AddIcon />}
                variant={"callAction"} />
                
              </SecureComponent>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <DataTable
            itemActions={tableActions}
            entityName={t("Access Keys")}
            columns={ACCOUNT_TABLE_COLUMNS}
            onSelect={(e) => selectSAs(e, setSelectedSAs, selectedSAs)}
            selectedItems={selectedSAs}
            isLoading={loading}
            records={filteredRecords}
            customEmptyMessage="暂无数据"
            idField="accessKey" />
            
          </Grid>
          <Grid item xs={12} sx={{ marginTop: 15 }}>
            <HelpBox
            title={t("Learn more about ACCESS KEYS")}
            iconComponent={<AccountIcon />}
            help={
            <Fragment>{t("MinIO access keys are child identities of an authenticated MinIO user, including externally managed identities. Each access key inherits its privileges based on the policies attached to it\u2019s parent user or those groups in which the parent user has membership. Access Keys also support an optional inline policy which further restricts access to a subset of actions and resources available to the parent user.")}







              <br />
                  <br />{t("You can learn more at our")}
              {" "}
                  <a
              href="https://min.io/docs/minio/linux/administration/identity-access-management/minio-user-management.html?ref=con#id3"
              target="_blank"
              rel="noopener">{t("documentation")}


              </a>
                  .
                </Fragment>} />

            
          </Grid>
        </Grid>
      </PageLayout>
    </React.Fragment>);

};

export default Account;