// query expression returns arrays of union type (not supported ATM https://github.com/ballerina-platform/ballerina-lang/issues/40012)
function tnfUnionQuery1(T3 t3) returns T4 => {
    t1sOrT2s: from var t1sItem in t3.t1s
        select {
            str:
        }
};

// query expression returns union type consist of arrays , type resolved by casting
function tnfUnionQuery2(T3 t3) returns T5 => {
    t1OrT2s: from var t1sItem in t3.t1s
        select <T1>{
            str: 0
        }
};

// query expression returns union type consist of arrays , type resolved via value expression
function tnfUnionQuery3(T3 t3) returns T5 => {
    t1OrT2s: from var t1sItem in t3.t1s
        select {
            str: t1sItem.str
        }
};

// query expression returns union type consist of arrays , type resolved via value expression
function tnfUnionQuery5(T3 t3) returns T51 => {
    t11sOrT2s: from var t1sItem in t3.t1s
        select {
            str: "",
            person: {
                name: t1sItem.str,
                age: 10,
                parent: {
                    parentName: t1sItem.str,
                    parentAge: 100
                }
            }
        }
};

// query expression returns union type consist of arrays , select clause contains conditional expression (not supported ATM https://github.com/ballerina-platform/ballerina-lang/issues/40013)
function tnfUnionQuery6(T3 t3) returns T5 => {
    t1OrT2s: from var t1sItem in t3.t1s
        select t1sItem.str == "foo" ? {str: t1sItem.str} : {foo: true}
};
