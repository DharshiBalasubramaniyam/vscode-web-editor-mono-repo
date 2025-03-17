// tslint:disable: jsx-no-multiline-js
import React from "react";

import {
  CommaToken,
  DefaultableParam,
  IncludedRecordParam,
  RequiredParam,
  RestParam,
  STKindChecker,
} from "@dharshi/syntax-tree";

import "./style.scss";

interface ResourceOtherParamsProps {
  parameters: (
    | CommaToken
    | DefaultableParam
    | IncludedRecordParam
    | RequiredParam
    | RestParam
  )[];
}

export function ResourceOtherParams(props: ResourceOtherParamsProps) {
  const { parameters } = props;

  const otherParamComponents = parameters
    .filter((param) => !STKindChecker.isCommaToken(param))
    .filter(
      (param) =>
        STKindChecker.isRequiredParam(param) &&
        !(
          STKindChecker.isStringTypeDesc(param.typeName) ||
          STKindChecker.isIntTypeDesc(param.typeName) ||
          STKindChecker.isBooleanTypeDesc(param.typeName) ||
          STKindChecker.isFloatTypeDesc(param.typeName) ||
          STKindChecker.isDecimalTypeDesc(param.typeName)
        )
    )
    .map((param: RequiredParam, i) => (
      <span key={i} className={"signature-param"}>
        {param.source}
      </span>
    ));

  return (
    <div className={"param-container"}>
      <p className={"path-text"}>{otherParamComponents}</p>
    </div>
  );
}
