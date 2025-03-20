// query expression returning union type consist of array of records
function tnfUnionQueryAtFnBody1(T3 t3) returns T1[]|T2[] => <T1[]>from var t1sItem in t3.t1s
    select {
        str: ""
    };

// mapped to root level and type resolved through value
function tnfUnionQueryAtFnBody3(T3 t3) returns T1[]|T2[] => t3.t1s;

// query expression returns array of union types , type resolved by value expression
function tnfUnionQueryAtFnBody4(T3 t3) returns (T1|T2)[] => from var t1sItem in t3.t1s
    select {
        str: t1sItem.str
    };

// query expression returns array of union types , type resolved via type casting
function tnfUnionQueryAtFnBody5(T3 t3) returns (T1|T2)[] => from var t1sItem in t3.t1s
    select <T1>{
        str: 100
    };

// query expression returns array of union types , type resolved by value expression
function tnfUnionQueryAtFnBody6(Vehicle[] vehicle) returns (SUV|HighEndCar)[] => from var item in vehicle
        select {
            year: item.year,
            model: item.category
        };
