AutoForm.addInputType("date", {
  template: "afInputDate",
  valueIn: function (val) {
    //convert Date to string value
    return (val instanceof Date) ? Utility.dateToDateStringUTC(val) : val;
  },
  valueOut: function () {
    var val = this.val();
    if (Utility.isValidDateString(val)) {
      //Date constructor will interpret val as UTC and create
      //date at mignight in the morning of val date in UTC time zone
      return new Date(val);
    } else {
      return null;
    }
  },
  valueConverters: {
    "string": function (val) {
      return (val instanceof Date) ? Utility.dateToDateStringUTC(val) : val;
    },
    "stringArray": function (val) {
      if (val instanceof Date) {
        return [Utility.dateToDateStringUTC(val)];
      }
      return null;
    },
    "number": function (val) {
      return (val instanceof Date) ? val.getTime() : val;
    },
    "numberArray": function (val) {
      if (val instanceof Date) {
        return [val.getTime()];
      }
      return null;
    },
    "dateArray": function (val) {
      if (val instanceof Date) {
        return [val];
      }
      return null;
    }
  },
  contextAdjust: function (context) {
    if (typeof context.atts.max === "undefined" && context.max instanceof Date) {
      context.atts.max = Utility.dateToDateStringUTC(context.max);
    }
    if (typeof context.atts.min === "undefined" && context.min instanceof Date) {
      context.atts.min = Utility.dateToDateStringUTC(context.min);
    }
    return context;
  }
});