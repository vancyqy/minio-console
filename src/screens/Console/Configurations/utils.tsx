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
import React from "react";
import { IElement, IElementValue, IOverrideEnv, OverrideValue } from "./types";
import { CodeIcon, CompressIcon, ConsoleIcon, FindReplaceIcon, FirstAidIcon, KeyIcon, LogsIcon, PendingItemsIcon, PublicIcon } from "mds";
export const configurationElements: IElement[] = [{
  icon: <PublicIcon />,
  configuration_id: "region",
  configuration_label: t("Region")
}, {
  icon: <CompressIcon />,
  configuration_id: "compression",
  configuration_label: t("Compression")
}, {
  icon: <CodeIcon />,
  configuration_id: "api",
  configuration_label: t("API")
}, {
  icon: <FirstAidIcon />,
  configuration_id: "heal",
  configuration_label: t("Heal")
}, {
  icon: <FindReplaceIcon />,
  configuration_id: "scanner",
  configuration_label: t("Scanner")
}, {
  icon: <KeyIcon />,
  configuration_id: "etcd",
  configuration_label: t("Etcd")
}, {
  icon: <ConsoleIcon />,
  configuration_id: "logger_webhook",
  configuration_label: t("Logger Webhook")
}, {
  icon: <PendingItemsIcon />,
  configuration_id: "audit_webhook",
  configuration_label: t("Audit Webhook")
}, {
  icon: <LogsIcon />,
  configuration_id: "audit_kafka",
  configuration_label: t("Audit Kafka")
}];
export const fieldsConfigurations: any = {
  region: [{
    name: "name",
    required: true,
    label: t("Server Location"),
    tooltip: t("Name of the location of the server e.g. \"us-west-rack2\""),
    type: "string",
    placeholder: t("e.g. us-west-rack-2")
  }, {
    name: "comment",
    required: false,
    label: t("Comment"),
    tooltip: t("You can add a comment to this setting"),
    type: "comment",
    placeholder: t("Enter custom notes if any")
  }],
  compression: [{
    name: "extensions",
    required: false,
    label: t("Extensions"),
    tooltip: t("Extensions to compress e.g. \".txt\", \".log\" or \".csv\" - you can write one per field"),
    type: "csv",
    placeholder: t("Enter an Extension"),
    withBorder: true
  }, {
    name: "mime_types",
    required: false,
    label: t("Mime Types"),
    tooltip: t("Mime types e.g. \"text/*\", \"application/json\" or \"application/xml\" - you can write one per field"),
    type: "csv",
    placeholder: t("Enter a Mime Type"),
    withBorder: true
  }],
  api: [{
    name: "requests_max",
    required: false,
    label: t("Requests Max"),
    tooltip: t("Maximum number of concurrent requests, e.g. '1600'"),
    type: "number",
    placeholder: t("Enter Requests Max")
  }, {
    name: "cors_allow_origin",
    required: false,
    label: t("Cors Allow Origin"),
    tooltip: t("List of origins allowed for CORS requests"),
    type: "csv",
    placeholder: t("Enter allowed origin e.g. https://example.com")
  }, {
    name: "replication_workers",
    required: false,
    label: t("Replication Workers"),
    tooltip: t("Number of replication workers, defaults to 100"),
    type: "number",
    placeholder: t("Enter Replication Workers")
  }, {
    name: "replication_failed_workers",
    required: false,
    label: t("Replication Failed Workers"),
    tooltip: t("Number of replication workers for recently failed replicas, defaults to 4"),
    type: "number",
    placeholder: t("Enter Replication Failed Workers")
  }],
  heal: [{
    name: "bitrotscan",
    required: false,
    label: t("Bitrot Scan"),
    tooltip: t("Perform bitrot scan on disks when checking objects during scanner"),
    type: "on|off"
  }, {
    name: "max_sleep",
    required: false,
    label: t("Max Sleep"),
    tooltip: t("Maximum sleep duration between objects to slow down heal operation, e.g. 2s"),
    type: "duration",
    placeholder: t("Enter Max Sleep Duration")
  }, {
    name: "max_io",
    required: false,
    label: t("Max IO"),
    tooltip: t("Maximum IO requests allowed between objects to slow down heal operation, e.g. 3"),
    type: "number",
    placeholder: t("Enter Max IO")
  }],
  scanner: [{
    name: "delay",
    required: false,
    label: t("Delay Multiplier"),
    tooltip: t("Scanner delay multiplier, defaults to '10.0'"),
    type: "number",
    placeholder: t("Enter Delay")
  }, {
    name: "max_wait",
    required: false,
    label: t("Max Wait"),
    tooltip: t("Maximum wait time between operations, defaults to '15s'"),
    type: "duration",
    placeholder: t("Enter Max Wait")
  }, {
    name: "cycle",
    required: false,
    label: t("Cycle"),
    tooltip: t("Time duration between scanner cycles, defaults to '1m'"),
    type: "duration",
    placeholder: t("Enter Cycle")
  }],
  etcd: [{
    name: "endpoints",
    required: true,
    label: t("Endpoints"),
    tooltip: t("List of etcd endpoints e.g. \"http://localhost:2379\" - you can write one per field"),
    type: "csv",
    placeholder: t("Enter Endpoint")
  }, {
    name: "path_prefix",
    required: false,
    label: t("Path Prefix"),
    tooltip: t("Namespace prefix to isolate tenants e.g. \"customer1/\""),
    type: "string",
    placeholder: t("Enter Path Prefix")
  }, {
    name: "coredns_path",
    required: false,
    label: t("Coredns Path"),
    tooltip: t("Shared bucket DNS records, default is \"/skydns\""),
    type: "string",
    placeholder: t("Enter Coredns Path")
  }, {
    name: "client_cert",
    required: false,
    label: t("Client Cert"),
    tooltip: t("Client cert for mTLS authentication"),
    type: "string",
    placeholder: t("Enter Client Cert")
  }, {
    name: "client_cert_key",
    required: false,
    label: t("Client Cert Key"),
    tooltip: t("Client cert key for mTLS authentication"),
    type: "string",
    placeholder: t("Enter Client Cert Key")
  }, {
    name: "comment",
    required: false,
    label: t("Comment"),
    tooltip: t("You can add a comment to this setting"),
    type: "comment",
    multiline: true,
    placeholder: t("Enter custom notes if any")
  }],
  logger_webhook: [{
    name: "endpoint",
    required: true,
    label: t("Endpoint"),
    type: "string",
    placeholder: t("Enter Endpoint")
  }, {
    name: "auth_token",
    required: true,
    label: t("Auth Token"),
    type: "string",
    placeholder: t("Enter Auth Token")
  }],
  audit_webhook: [{
    name: "endpoint",
    required: true,
    label: t("Endpoint"),
    type: "string",
    placeholder: t("Enter Endpoint")
  }, {
    name: "auth_token",
    required: true,
    label: t("Auth Token"),
    type: "string",
    placeholder: t("Enter Auth Token")
  }],
  audit_kafka: [{
    name: "enable",
    required: false,
    label: t("Enable"),
    tooltip: t("Enable audit_kafka target"),
    type: "on|off",
    customValueProcess: (origValue: string) => {
      return origValue === "" || origValue === "on" ? t("on") : t("off");
    }
  }, {
    name: "brokers",
    required: true,
    label: t("Brokers"),
    type: "csv",
    placeholder: t("Enter Kafka Broker")
  }, {
    name: "topic",
    required: false,
    label: t("Topic"),
    type: "string",
    placeholder: t("Enter Kafka Topic"),
    tooltip: t("Kafka topic used for bucket notifications")
  }, {
    name: "sasl",
    required: false,
    label: t("Use SASL"),
    tooltip: t("Enable SASL (Simple Authentication and Security Layer) authentication"),
    type: "on|off"
  }, {
    name: "sasl_username",
    required: false,
    label: t("SASL Username"),
    type: "string",
    placeholder: t("Enter SASL Username"),
    tooltip: t("Username for SASL/PLAIN or SASL/SCRAM authentication")
  }, {
    name: "sasl_password",
    required: false,
    label: t("SASL Password"),
    type: "password",
    placeholder: t("Enter SASL Password"),
    tooltip: t("Password for SASL/PLAIN or SASL/SCRAM authentication")
  }, {
    name: "sasl_mechanism",
    required: false,
    label: t("SASL Mechanism"),
    type: "string",
    placeholder: t("Enter SASL Mechanism"),
    tooltip: t("SASL authentication mechanism")
  }, {
    name: "tls",
    required: false,
    label: t("Use TLS"),
    tooltip: t("Enable TLS (Transport Layer Security)"),
    type: "on|off"
  }, {
    name: "tls_skip_verify",
    required: false,
    label: t("Skip TLS Verification"),
    tooltip: t("Trust server TLS without verification"),
    type: "on|off"
  }, {
    name: "client_tls_cert",
    required: false,
    label: t("Client Cert"),
    tooltip: t("Client cert for mTLS authentication"),
    type: "string",
    placeholder: t("Enter Client Cert")
  }, {
    name: "client_tls_key",
    required: false,
    label: t("Client Cert Key"),
    tooltip: t("Client cert key for mTLS authentication"),
    type: "string",
    placeholder: t("Enter Client Cert Key")
  }, {
    name: "tls_client_auth",
    required: false,
    label: t("TLS Client Auth"),
    tooltip: t("ClientAuth determines the Kafka server's policy for TLS client authorization"),
    type: "string"
  }, {
    name: "version",
    required: false,
    label: t("Version"),
    tooltip: t("Specify the version of the Kafka cluster"),
    type: "string"
  }]
};
export const removeEmptyFields = (formFields: IElementValue[]) => {
  const nonEmptyFields = formFields.filter(field => field.value !== "");
  return nonEmptyFields;
};
export const selectSAs = (e: React.ChangeEvent<HTMLInputElement>, setSelectedSAs: Function, selectedSAs: string[]) => {
  const targetD = e.target;
  const value = targetD.value;
  const checked = targetD.checked;
  let elements: string[] = [...selectedSAs]; // We clone the selectedSAs array
  if (checked) {
    // If the user has checked this field we need to push this to selectedSAs
    elements.push(value);
  } else {
    // User has unchecked this field, we need to remove it from the list
    elements = elements.filter(element => element !== value);
  }
  setSelectedSAs(elements);
  return elements;
};
export const overrideFields = (formFields: IElementValue[]): IOverrideEnv => {
  let overrideReturn: IOverrideEnv = {};
  formFields.forEach(envItem => {
    // it has override values, we construct the value
    if (envItem.env_override) {
      const value: OverrideValue = {
        value: envItem.env_override.value || "",
        overrideEnv: envItem.env_override.name || ""
      };
      overrideReturn = {
        ...overrideReturn,
        [envItem.key]: value
      };
    }
  });
  return overrideReturn;
};