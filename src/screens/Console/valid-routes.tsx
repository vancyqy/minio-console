//  This file is part of MinIO Console Server
//  Copyright (c) 2022 MinIO, Inc.
//
//  This program is free software: you can redistribute it and/or modify
//  it under the terms of the GNU Affero General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU Affero General Public License for more details.
//
//  You should have received a copy of the GNU Affero General Public License
//  along with this program.  If not, see <http://www.gnu.org/licenses/>.

import React from "react";
import { t } from "i18next";
import { IMenuItem } from "./Menu/types";
import {
  adminUserPermissions,
  CONSOLE_UI_RESOURCE,
  IAM_PAGES,
  IAM_PAGES_PERMISSIONS,
  IAM_SCOPES,
  S3_ALL_RESOURCES,
} from "../../common/SecureComponent/permissions";
import {
  AccessMenuIcon,
  AccountsMenuIcon,
  AuditLogsMenuIcon,
  BucketsMenuIcon,
  CallHomeMenuIcon,
  DocumentationIcon,
  GroupsMenuIcon,
  HealthMenuIcon,
  IdentityMenuIcon,
  InspectMenuIcon,
  LambdaIcon,
  LicenseIcon,
  LockOpenIcon,
  LoginIcon,
  LogsMenuIcon,
  MetricsMenuIcon,
  MonitoringMenuIcon,
  ObjectBrowserIcon,
  PerformanceMenuIcon,
  ProfileMenuIcon,
  RecoverIcon,
  SettingsIcon,
  TiersIcon,
  TraceMenuIcon,
  UsersMenuIcon,
  WatchIcon,
} from "mds";
import { hasPermission } from "../../common/SecureComponent";
import EncryptionIcon from "../../icons/SidebarMenus/EncryptionIcon";
import EncryptionStatusIcon from "../../icons/SidebarMenus/EncryptionStatusIcon";

const permissionsValidation = (item: IMenuItem) => {
  return (
    ((item.customPermissionFnc
      ? item.customPermissionFnc()
      : hasPermission(
          CONSOLE_UI_RESOURCE,
          IAM_PAGES_PERMISSIONS[item.path ?? ""],
        )) ||
      item.forceDisplay) &&
    !item.fsHidden
  );
};

const validateItem = (item: IMenuItem) => {
  // We clean up child items first
  if (item.children && item.children.length > 0) {
    const childArray: IMenuItem[] = item.children.reduce(
      (acc: IMenuItem[], item) => {
        if (!validateItem(item)) {
          return [...acc];
        }

        return [...acc, item];
      },
      [],
    );

    const ret = { ...item, children: childArray };

    return ret;
  }

  if (permissionsValidation(item)) {
    return item;
  }

  return false;
};

export const validRoutes = (
  features: string[] | null | undefined,
  licenseNotification: boolean = false,
) => {
  const ldapIsEnabled = (features && features.includes("ldap-idp")) || false;
  const kmsIsEnabled = (features && features.includes("kms")) || false;

  let consoleMenus: IMenuItem[] = [
    {
      group: t( "User"),
      // name: "Object Browser",
      name: t("Object Browser"),
      id: "object-browser",
      path: IAM_PAGES.OBJECT_BROWSER_VIEW,
      icon: <ObjectBrowserIcon />,
      forceDisplay: true,
    },
    {
      group: t( "User"),
      id: "nav-accesskeys",
      path: IAM_PAGES.ACCOUNT,
      name: t("Access Keys"),
      icon: <AccountsMenuIcon />,
      forceDisplay: true,
    },
    // {
    //   group: t( "User"),
    //   path: "https://min.io/docs/minio/linux/index.html?ref=con",
    //   name: t("Documentation"),
    //   icon: <DocumentationIcon />,
    //   forceDisplay: true,
    // },
    {
      group: t( "Administrator"),
      name: t("Buckets"),
      id: "buckets",
      path: IAM_PAGES.BUCKETS,
      icon: <BucketsMenuIcon />,
      forceDisplay: true,
    },
    {
      group: t( "Administrator"),
      name: t("Policies"),
      id: "policies",
      path: IAM_PAGES.POLICIES,
      icon: <AccessMenuIcon />,
    },
    {
      group: t( "Administrator"),
      name: t("Identity"),
      id: "identity",
      icon: <IdentityMenuIcon />,
      children: [
        {
          id: "users",
          path: IAM_PAGES.USERS,
          customPermissionFnc: () =>
            hasPermission(CONSOLE_UI_RESOURCE, adminUserPermissions) ||
            hasPermission(S3_ALL_RESOURCES, adminUserPermissions) ||
            hasPermission(CONSOLE_UI_RESOURCE, [IAM_SCOPES.ADMIN_ALL_ACTIONS]),
          name: t("Users"),
          icon: <UsersMenuIcon />,
          fsHidden: ldapIsEnabled,
        },
        {
          id: "groups",
          path: IAM_PAGES.GROUPS,
          name: t("Groups"),
          icon: <GroupsMenuIcon />,
          fsHidden: ldapIsEnabled,
        },
        // {
        //   name: t("OpenID"),
        //   id: "openID",
        //   path: IAM_PAGES.IDP_OPENID_CONFIGURATIONS,
        //   icon: <LockOpenIcon />,
        // },
        // {
        //   name: t("LDAP"),
        //   id: "ldap",
        //   path: IAM_PAGES.IDP_LDAP_CONFIGURATIONS,
        //   icon: <LoginIcon />,
        // },
      ],
    },
    {
      group: t( "Administrator"),
      name: t("Monitoring"),
      id: "tools",
      icon: <MonitoringMenuIcon />,
      children: [
        {
          name: t("Metrics"),
          id: "monitorMetrics",
          path: IAM_PAGES.DASHBOARD,
          icon: <MetricsMenuIcon />,
        },
        {
          name: t("Logs"),
          id: "monitorLogs",
          path: IAM_PAGES.TOOLS_LOGS,
          icon: <LogsMenuIcon />,
        },
        // {
        //   name: t("Audit"),
        //   id: "monitorAudit",
        //   path: IAM_PAGES.TOOLS_AUDITLOGS,
        //   icon: <AuditLogsMenuIcon />,
        // },
        // {
        //   name: t("Trace"),
        //   id: "monitorTrace",
        //   path: IAM_PAGES.TOOLS_TRACE,
        //   icon: <TraceMenuIcon />,
        // },
        // {
        //   name: t("Watch"),
        //   id: "monitorWatch",
        //   icon: <WatchIcon />,
        //   path: IAM_PAGES.TOOLS_WATCH,
        // },
        {
          name: t("Encryption"),
          id: "monitorEncryption",
          path: IAM_PAGES.KMS_STATUS,
          icon: <EncryptionStatusIcon />,
          fsHidden: !kmsIsEnabled,
        },
      ],
    },
    // {
    //   group: t( "Administrator"),
    //   path: IAM_PAGES.EVENT_DESTINATIONS,
    //   name: t("Events"),
    //   icon: <LambdaIcon />,
    //   id: "lambda",
    // },
    // {
    //   group: t( "Administrator"),
    //   path: IAM_PAGES.TIERS,
    //   name: t("Tiering"),
    //   icon: <TiersIcon />,
    //   id: "tiers",
    // },
    // {
    //   group: t( "Administrator"),
    //   path: IAM_PAGES.SITE_REPLICATION,
    //   name: t("Site Replication"),
    //   icon: <RecoverIcon />,
    //   id: "sitereplication",
    // },
    {
      group: t( "Administrator"),
      path: IAM_PAGES.KMS_KEYS,
      name: t("Encryption"),
      icon: <EncryptionIcon />,
      id: "encryption",
      fsHidden: !kmsIsEnabled,
    },
    // {
    //   group: t( "Administrator"),
    //   path: IAM_PAGES.SETTINGS,
    //   name: t("Configuration"),
    //   id: "configurations",
    //   icon: <SettingsIcon />,
    // },


    // {
    //   group: t( "Subnet"),
    //   path: IAM_PAGES.LICENSE,
    //   name: t("License"),
    //   id: "license",
    //   icon: <LicenseIcon />,
    //   badge: licenseNotification,
    //   forceDisplay: true,
    // },
    // {
    //   group: t( "Subnet"),
    //   name: t("Health"),
    //   id: "diagnostics",
    //   icon: <HealthMenuIcon />,
    //   path: IAM_PAGES.TOOLS_DIAGNOSTICS,
    // },
    // {
    //   group: t( "Subnet"),
    //   name: t("Performance"),
    //   id: "performance",
    //   icon: <PerformanceMenuIcon />,
    //   path: IAM_PAGES.TOOLS_SPEEDTEST,
    // },
    // {
    //   group: t( "Subnet"),
    //   name: t("Profile"),
    //   id: "profile",
    //   icon: <ProfileMenuIcon />,
    //   path: IAM_PAGES.PROFILE,
    // },
    // {
    //   group: t( "Subnet"),
    //   name: t("Inspect"),
    //   id: "inspectObjects",
    //   path: IAM_PAGES.SUPPORT_INSPECT,
    //   icon: <InspectMenuIcon />,
    // },
    // {
    //   group: t( "Subnet"),
    //   name: t("Call Home"),
    //   id: "callhome",
    //   icon: <CallHomeMenuIcon />,
    //   path: IAM_PAGES.CALL_HOME,
    // },
  ];

  return consoleMenus.reduce((acc: IMenuItem[], item) => {
    const validation = validateItem(item);
    if (!validation) {
      return [...acc];
    }

    return [...acc, validation];
  }, []);
};
