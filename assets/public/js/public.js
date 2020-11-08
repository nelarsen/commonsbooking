!function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define("Litepicker", [], e) : "object" == typeof exports ? exports.Litepicker = e() : t.Litepicker = e();
}(window, function() {
    return function(t) {
        var e = {};
        function i(o) {
            if (e[o]) return e[o].exports;
            var n = e[o] = {
                i: o,
                l: !1,
                exports: {}
            };
            return t[o].call(n.exports, n, n.exports, i), n.l = !0, n.exports;
        }
        return i.m = t, i.c = e, i.d = function(t, e, o) {
            i.o(t, e) || Object.defineProperty(t, e, {
                enumerable: !0,
                get: o
            });
        }, i.r = function(t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(t, "__esModule", {
                value: !0
            });
        }, i.t = function(t, e) {
            if (1 & e && (t = i(t)), 8 & e) return t;
            if (4 & e && "object" == typeof t && t && t.__esModule) return t;
            var o = Object.create(null);
            if (i.r(o), Object.defineProperty(o, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t) for (var n in t) i.d(o, n, function(e) {
                return t[e];
            }.bind(null, n));
            return o;
        }, i.n = function(t) {
            var e = t && t.__esModule ? function() {
                return t.default;
            } : function() {
                return t;
            };
            return i.d(e, "a", e), e;
        }, i.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e);
        }, i.p = "", i(i.s = 4);
    }([ function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.DateTime = void 0;
        var o = function() {
            function t(e, i, o) {
                void 0 === e && (e = null), void 0 === i && (i = null), void 0 === o && (o = "en-US"), 
                this.dateInstance = i ? t.parseDateTime(e, i, o) : e ? t.parseDateTime(e) : t.parseDateTime(new Date()), 
                this.lang = o;
            }
            return t.parseDateTime = function(e, i, o) {
                if (void 0 === i && (i = "YYYY-MM-DD"), void 0 === o && (o = "en-US"), !e) return new Date(NaN);
                if (e instanceof Date) return new Date(e);
                if (e instanceof t) return e.clone().getDateInstance();
                if (/^-?\d{10,}$/.test(e)) return t.getDateZeroTime(new Date(Number(e)));
                if ("string" == typeof e) {
                    var n = i.match(/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}/g);
                    if (n) {
                        var s = {
                            year: 1,
                            month: 2,
                            day: 3,
                            value: ""
                        }, a = null, r = null;
                        -1 !== n.indexOf("MMM") && (a = this.MONTH_JS.map(function(t) {
                            return new Date(2019, t).toLocaleString(o, {
                                month: "short"
                            });
                        })), -1 !== n.indexOf("MMMM") && (r = this.MONTH_JS.map(function(t) {
                            return new Date(2019, t).toLocaleString(o, {
                                month: "long"
                            });
                        }));
                        for (var l = 0, d = Object.entries(n); l < d.length; l++) {
                            var c = d[l], p = c[0], h = c[1], u = Number(p), m = String(h);
                            switch (u > 0 && (s.value += ".*?"), m) {
                              case "YY":
                              case "YYYY":
                                s.year = u + 1, s.value += "(\\d{" + m.length + "})";
                                break;

                              case "M":
                                s.month = u + 1, s.value += "(\\d{1,2})";
                                break;

                              case "MM":
                                s.month = u + 1, s.value += "(\\d{" + m.length + "})";
                                break;

                              case "MMM":
                                s.month = u + 1, s.value += "(" + a.join("|") + ")";
                                break;

                              case "MMMM":
                                s.month = u + 1, s.value += "(" + r.join("|") + ")";
                                break;

                              case "D":
                                s.day = u + 1, s.value += "(\\d{1,2})";
                                break;

                              case "DD":
                                s.day = u + 1, s.value += "(\\d{" + m.length + "})";
                            }
                        }
                        var f = new RegExp("^" + s.value + "$");
                        if (f.test(e)) {
                            var y = f.exec(e), g = Number(y[s.year]), k = Number(y[s.month]) - 1;
                            a ? k = a.indexOf(y[s.month]) : r && (k = r.indexOf(y[s.month]));
                            var D = Number(y[s.day]) || 1;
                            return new Date(g, k, D, 0, 0, 0, 0);
                        }
                    }
                }
                return t.getDateZeroTime(new Date(e));
            }, t.convertArray = function(e, i) {
                return e.map(function(e) {
                    return e instanceof Array ? e.map(function(e) {
                        return new t(e, i);
                    }) : new t(e, i);
                });
            }, t.getDateZeroTime = function(t) {
                return new Date(t.getFullYear(), t.getMonth(), t.getDate(), 0, 0, 0, 0);
            }, t.prototype.getDateInstance = function() {
                return this.dateInstance;
            }, t.prototype.toLocaleString = function(t, e) {
                return this.dateInstance.toLocaleString(t, e);
            }, t.prototype.toDateString = function() {
                return this.dateInstance.toDateString();
            }, t.prototype.getSeconds = function() {
                return this.dateInstance.getSeconds();
            }, t.prototype.getDay = function() {
                return this.dateInstance.getDay();
            }, t.prototype.getTime = function() {
                return this.dateInstance.getTime();
            }, t.prototype.getDate = function() {
                return this.dateInstance.getDate();
            }, t.prototype.getMonth = function() {
                return this.dateInstance.getMonth();
            }, t.prototype.getFullYear = function() {
                return this.dateInstance.getFullYear();
            }, t.prototype.setMonth = function(t) {
                return this.dateInstance.setMonth(t);
            }, t.prototype.setHours = function(t, e, i, o) {
                void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === o && (o = 0), 
                this.dateInstance.setHours(t, e, i, o);
            }, t.prototype.setSeconds = function(t) {
                return this.dateInstance.setSeconds(t);
            }, t.prototype.setDate = function(t) {
                return this.dateInstance.setDate(t);
            }, t.prototype.setFullYear = function(t) {
                return this.dateInstance.setFullYear(t);
            }, t.prototype.getWeek = function(t) {
                var e = new Date(this.timestamp()), i = (this.getDay() + (7 - t)) % 7;
                e.setDate(e.getDate() - i);
                var o = e.getTime();
                return e.setMonth(0, 1), e.getDay() !== t && e.setMonth(0, 1 + (4 - e.getDay() + 7) % 7), 
                1 + Math.ceil((o - e.getTime()) / 6048e5);
            }, t.prototype.clone = function() {
                return new t(this.getDateInstance());
            }, t.prototype.isBetween = function(t, e, i) {
                switch (void 0 === i && (i = "()"), i) {
                  default:
                  case "()":
                    return this.timestamp() > t.getTime() && this.timestamp() < e.getTime();

                  case "[)":
                    return this.timestamp() >= t.getTime() && this.timestamp() < e.getTime();

                  case "(]":
                    return this.timestamp() > t.getTime() && this.timestamp() <= e.getTime();

                  case "[]":
                    return this.timestamp() >= t.getTime() && this.timestamp() <= e.getTime();
                }
            }, t.prototype.isBefore = function(t, e) {
                switch (void 0 === e && (e = "seconds"), e) {
                  case "second":
                  case "seconds":
                    return t.getTime() > this.getTime();

                  case "day":
                  case "days":
                    return new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime() > new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime();

                  case "month":
                  case "months":
                    return new Date(t.getFullYear(), t.getMonth(), 1).getTime() > new Date(this.getFullYear(), this.getMonth(), 1).getTime();

                  case "year":
                  case "years":
                    return t.getFullYear() > this.getFullYear();
                }
                throw new Error("isBefore: Invalid unit!");
            }, t.prototype.isSameOrBefore = function(t, e) {
                switch (void 0 === e && (e = "seconds"), e) {
                  case "second":
                  case "seconds":
                    return t.getTime() >= this.getTime();

                  case "day":
                  case "days":
                    return new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime() >= new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime();

                  case "month":
                  case "months":
                    return new Date(t.getFullYear(), t.getMonth(), 1).getTime() >= new Date(this.getFullYear(), this.getMonth(), 1).getTime();
                }
                throw new Error("isSameOrBefore: Invalid unit!");
            }, t.prototype.isAfter = function(t, e) {
                switch (void 0 === e && (e = "seconds"), e) {
                  case "second":
                  case "seconds":
                    return this.getTime() > t.getTime();

                  case "day":
                  case "days":
                    return new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime() > new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime();

                  case "month":
                  case "months":
                    return new Date(this.getFullYear(), this.getMonth(), 1).getTime() > new Date(t.getFullYear(), t.getMonth(), 1).getTime();

                  case "year":
                  case "years":
                    return this.getFullYear() > t.getFullYear();
                }
                throw new Error("isAfter: Invalid unit!");
            }, t.prototype.isSameOrAfter = function(t, e) {
                switch (void 0 === e && (e = "seconds"), e) {
                  case "second":
                  case "seconds":
                    return this.getTime() >= t.getTime();

                  case "day":
                  case "days":
                    return new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime() >= new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime();

                  case "month":
                  case "months":
                    return new Date(this.getFullYear(), this.getMonth(), 1).getTime() >= new Date(t.getFullYear(), t.getMonth(), 1).getTime();
                }
                throw new Error("isSameOrAfter: Invalid unit!");
            }, t.prototype.isSame = function(t, e) {
                switch (void 0 === e && (e = "seconds"), e) {
                  case "second":
                  case "seconds":
                    return this.getTime() === t.getTime();

                  case "day":
                  case "days":
                    return new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime() === new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime();

                  case "month":
                  case "months":
                    return new Date(this.getFullYear(), this.getMonth(), 1).getTime() === new Date(t.getFullYear(), t.getMonth(), 1).getTime();
                }
                throw new Error("isSame: Invalid unit!");
            }, t.prototype.add = function(t, e) {
                switch (void 0 === e && (e = "seconds"), e) {
                  case "second":
                  case "seconds":
                    this.setSeconds(this.getSeconds() + t);
                    break;

                  case "day":
                  case "days":
                    this.setDate(this.getDate() + t);
                    break;

                  case "month":
                  case "months":
                    this.setMonth(this.getMonth() + t);
                }
                return this;
            }, t.prototype.subtract = function(t, e) {
                switch (void 0 === e && (e = "seconds"), e) {
                  case "second":
                  case "seconds":
                    this.setSeconds(this.getSeconds() - t);
                    break;

                  case "day":
                  case "days":
                    this.setDate(this.getDate() - t);
                    break;

                  case "month":
                  case "months":
                    this.setMonth(this.getMonth() - t);
                }
                return this;
            }, t.prototype.diff = function(t, e) {
                switch (void 0 === e && (e = "seconds"), e) {
                  default:
                  case "second":
                  case "seconds":
                    return this.getTime() - t.getTime();

                  case "day":
                  case "days":
                    return Math.round((this.timestamp() - t.getTime()) / 864e5);

                  case "month":
                  case "months":
                }
            }, t.prototype.format = function(e, i) {
                void 0 === i && (i = "en-US");
                var o = "", n = e.match(/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}/g);
                if (n) {
                    var s = null, a = null;
                    -1 !== n.indexOf("MMM") && (s = t.MONTH_JS.map(function(t) {
                        return new Date(2019, t).toLocaleString(i, {
                            month: "short"
                        });
                    })), n.indexOf("MMMM") && (a = t.MONTH_JS.map(function(t) {
                        return new Date(2019, t).toLocaleString(i, {
                            month: "long"
                        });
                    }));
                    for (var r = 0, l = Object.entries(n); r < l.length; r++) {
                        var d = l[r], c = d[0], p = d[1], h = Number(c), u = String(p);
                        if (h > 0) {
                            var m = n[h - 1];
                            o += e.substring(e.indexOf(m) + m.length, e.indexOf(u));
                        }
                        switch (u) {
                          case "YY":
                            o += String(this.getFullYear()).slice(-2);
                            break;

                          case "YYYY":
                            o += String(this.getFullYear());
                            break;

                          case "M":
                            o += String(this.getMonth() + 1);
                            break;

                          case "MM":
                            o += ("0" + (this.getMonth() + 1)).slice(-2);
                            break;

                          case "MMM":
                            o += s[this.getMonth()];
                            break;

                          case "MMMM":
                            o += a[this.getMonth()];
                            break;

                          case "D":
                            o += String(this.getDate());
                            break;

                          case "DD":
                            o += ("0" + this.getDate()).slice(-2);
                        }
                    }
                }
                return o;
            }, t.prototype.timestamp = function() {
                return new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0, 0).getTime();
            }, t.MONTH_JS = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ], t;
        }();
        e.DateTime = o;
    }, function(t, e, i) {
        var o = i(6), n = i(7);
        "string" == typeof (n = n.__esModule ? n.default : n) && (n = [ [ t.i, n, "" ] ]), 
        o(n, {
            insert: function(t) {
                var e = document.querySelector("head"), i = window._lastElementInsertedByStyleLoader;
                window.disableLitepickerStyles || (i ? i.nextSibling ? e.insertBefore(t, i.nextSibling) : e.appendChild(t) : e.insertBefore(t, e.firstChild), 
                window._lastElementInsertedByStyleLoader = t);
            },
            singleton: !1
        }), t.exports = n.locals || {};
    }, function(t, e, i) {
        "use strict";
        function o() {
            return window.matchMedia("(orientation: portrait)").matches ? "portrait" : "landscape";
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.findNestedMonthItem = e.getOrientation = e.isMobile = void 0, e.isMobile = function() {
            var t = "portrait" === o();
            return window.matchMedia("(max-device-" + (t ? "width" : "height") + ": 480px)").matches;
        }, e.getOrientation = o, e.findNestedMonthItem = function(t) {
            for (var e = t.parentNode.childNodes, i = 0; i < e.length; i += 1) if (e.item(i) === t) return i;
            return 0;
        };
    }, function(t, e, i) {
        "use strict";
        var o, n = this && this.__extends || (o = function(t, e) {
            return (o = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function(t, e) {
                t.__proto__ = e;
            } || function(t, e) {
                for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            })(t, e);
        }, function(t, e) {
            function i() {
                this.constructor = t;
            }
            o(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, 
            new i());
        }), s = this && this.__assign || function() {
            return (s = Object.assign || function(t) {
                for (var e, i = 1, o = arguments.length; i < o; i++) for (var n in e = arguments[i]) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t;
            }).apply(this, arguments);
        }, a = this && this.__createBinding || (Object.create ? function(t, e, i, o) {
            void 0 === o && (o = i), Object.defineProperty(t, o, {
                enumerable: !0,
                get: function() {
                    return e[i];
                }
            });
        } : function(t, e, i, o) {
            void 0 === o && (o = i), t[o] = e[i];
        }), r = this && this.__setModuleDefault || (Object.create ? function(t, e) {
            Object.defineProperty(t, "default", {
                enumerable: !0,
                value: e
            });
        } : function(t, e) {
            t.default = e;
        }), l = this && this.__importStar || function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t) for (var i in t) "default" !== i && Object.hasOwnProperty.call(t, i) && a(e, t, i);
            return r(e, t), e;
        };
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.Litepicker = void 0;
        var d = i(5), c = i(0), p = l(i(1)), h = i(2), u = function(t) {
            function e(e) {
                var i = t.call(this) || this;
                i.options = s(s({}, i.options), e.element.dataset), Object.keys(i.options).forEach(function(t) {
                    "true" !== i.options[t] && "false" !== i.options[t] || (i.options[t] = "true" === i.options[t]);
                });
                var o = s(s({}, i.options.dropdowns), e.dropdowns), n = s(s({}, i.options.buttonText), e.buttonText), a = s(s({}, i.options.tooltipText), e.tooltipText);
                i.options = s(s({}, i.options), e), i.options.dropdowns = s({}, o), i.options.buttonText = s({}, n), 
                i.options.tooltipText = s({}, a), i.options.elementEnd || (i.options.allowRepick = !1), 
                i.options.lockDays.length && (i.options.lockDays = c.DateTime.convertArray(i.options.lockDays, i.options.lockDaysFormat)), 
                i.options.holidays.length && (i.options.holidays = c.DateTime.convertArray(i.options.holidays, i.options.holidaysFormat)), 
                i.options.bookedDays.length && (i.options.bookedDays = c.DateTime.convertArray(i.options.bookedDays, i.options.bookedDaysFormat)), 
                i.options.partiallyBookedDays.length && (i.options.partiallyBookedDays = c.DateTime.convertArray(i.options.partiallyBookedDays, i.options.partiallyBookedDaysFormat)), 
                i.options.highlightedDays.length && (i.options.highlightedDays = c.DateTime.convertArray(i.options.highlightedDays, i.options.highlightedDaysFormat)), 
                i.options.hotelMode && !("bookedDaysInclusivity" in e) && (i.options.bookedDaysInclusivity = "[)"), 
                i.options.hotelMode && !("partiallyBookedDaysInclusivity" in e) && (i.options.partiallyBookedDaysInclusivity = "[)"), 
                i.options.hotelMode && !("disallowBookedDaysInRange" in e) && (i.options.disallowBookedDaysInRange = !0), 
                i.options.hotelMode && !("selectForward" in e) && (i.options.selectForward = !0);
                var r = i.parseInput(), l = r[0], d = r[1];
                i.options.startDate && (i.options.singleMode || i.options.endDate) && (l = new c.DateTime(i.options.startDate, i.options.format, i.options.lang)), 
                l && i.options.endDate && (d = new c.DateTime(i.options.endDate, i.options.format, i.options.lang)), 
                l instanceof c.DateTime && !isNaN(l.getTime()) && (i.options.startDate = l), i.options.startDate && d instanceof c.DateTime && !isNaN(d.getTime()) && (i.options.endDate = d), 
                !i.options.singleMode || i.options.startDate instanceof c.DateTime || (i.options.startDate = null), 
                i.options.singleMode || i.options.startDate instanceof c.DateTime && i.options.endDate instanceof c.DateTime || (i.options.startDate = null, 
                i.options.endDate = null);
                for (var p = 0; p < i.options.numberOfMonths; p += 1) {
                    var h = i.options.startDate instanceof c.DateTime ? i.options.startDate.clone() : new c.DateTime();
                    h.setDate(1), h.setMonth(h.getMonth() + p), i.calendars[p] = h;
                }
                if (i.options.showTooltip) if (i.options.tooltipPluralSelector) i.pluralSelector = i.options.tooltipPluralSelector; else try {
                    var u = new Intl.PluralRules(i.options.lang);
                    i.pluralSelector = u.select.bind(u);
                } catch (t) {
                    i.pluralSelector = function(t) {
                        return 0 === Math.abs(t) ? "one" : "other";
                    };
                }
                return i.loadPolyfillsForIE11(), i.onInit(), i;
            }
            return n(e, t), e.prototype.onInit = function() {
                var t = this;
                document.addEventListener("click", function(e) {
                    return t.onClick(e);
                }, !0), this.picker = document.createElement("div"), this.picker.className = p.litepicker, 
                this.picker.style.display = "none", this.picker.addEventListener("mouseenter", function(e) {
                    return t.onMouseEnter(e);
                }, !0), this.picker.addEventListener("mouseleave", function(e) {
                    return t.onMouseLeave(e);
                }, !1), this.options.element instanceof HTMLElement && this.options.element.addEventListener("change", function(e) {
                    return t.onInput(e);
                }, !0), this.options.elementEnd instanceof HTMLElement && this.options.elementEnd.addEventListener("change", function(e) {
                    return t.onInput(e);
                }, !0), this.options.autoRefresh && (this.options.element instanceof HTMLElement && this.options.element.addEventListener("keyup", function(e) {
                    return t.onInput(e);
                }, !0), this.options.elementEnd instanceof HTMLElement && this.options.elementEnd.addEventListener("keyup", function(e) {
                    return t.onInput(e);
                }, !0)), this.options.moduleNavKeyboard && "function" == typeof this.enableModuleNavKeyboard && this.enableModuleNavKeyboard.call(this, this), 
                this.render(), this.options.parentEl ? this.options.parentEl instanceof HTMLElement ? this.options.parentEl.appendChild(this.picker) : document.querySelector(this.options.parentEl).appendChild(this.picker) : this.options.inlineMode ? this.options.element instanceof HTMLInputElement ? this.options.element.parentNode.appendChild(this.picker) : this.options.element.appendChild(this.picker) : document.body.appendChild(this.picker), 
                this.options.mobileFriendly && (this.backdrop = document.createElement("div"), this.backdrop.className = p.litepickerBackdrop, 
                this.backdrop.addEventListener("click", this.hide()), this.options.element && this.options.element.parentNode && this.options.element.parentNode.appendChild(this.backdrop), 
                window.addEventListener("orientationchange", function() {
                    if (t.options.mobileFriendly && t.isShowning()) {
                        switch (screen.orientation.angle) {
                          case -90:
                          case 90:
                            t.options.numberOfMonths = 2, t.options.numberOfColumns = 2;
                            break;

                          default:
                            t.options.numberOfMonths = 1, t.options.numberOfColumns = 1;
                        }
                        t.render();
                        var e = t.picker.getBoundingClientRect();
                        t.picker.style.top = "calc(50% - " + e.height / 2 + "px)", t.picker.style.left = "calc(50% - " + e.width / 2 + "px)";
                    }
                })), this.options.inlineMode && this.show(), this.updateInput();
            }, e.prototype.parseInput = function() {
                if (this.options.elementEnd) {
                    if (this.options.element instanceof HTMLInputElement && this.options.element.value.length && this.options.elementEnd instanceof HTMLInputElement && this.options.elementEnd.value.length) return [ new c.DateTime(this.options.element.value), new c.DateTime(this.options.elementEnd.value) ];
                } else if (this.options.singleMode) {
                    if (this.options.element instanceof HTMLInputElement && this.options.element.value.length) return [ new c.DateTime(this.options.element.value) ];
                } else if (/\s\-\s/.test(this.options.element.value)) {
                    var t = this.options.element.value.split(" - ");
                    if (2 === t.length) return [ new c.DateTime(t[0]), new c.DateTime(t[1]) ];
                }
                return [];
            }, e.prototype.updateInput = function() {
                if (this.options.element instanceof HTMLInputElement) {
                    if (this.options.singleMode && this.options.startDate) this.options.element.value = this.options.startDate.format(this.options.format, this.options.lang); else if (!this.options.singleMode && this.options.startDate && this.options.endDate) {
                        var t = this.options.startDate.format(this.options.format, this.options.lang), e = this.options.endDate.format(this.options.format, this.options.lang);
                        this.options.elementEnd ? (this.options.element.value = t, this.options.elementEnd.value = e) : this.options.element.value = t + " - " + e;
                    }
                    this.options.startDate || this.options.endDate || (this.options.element.value = "", 
                    this.options.elementEnd && (this.options.elementEnd.value = ""));
                }
            }, e.prototype.isSamePicker = function(t) {
                return t.closest("." + p.litepicker) === this.picker;
            }, e.prototype.shouldShown = function(t) {
                return t === this.options.element || this.options.elementEnd && t === this.options.elementEnd;
            }, e.prototype.shouldResetDatePicked = function() {
                return this.options.singleMode || 2 === this.datePicked.length;
            }, e.prototype.shouldSwapDatePicked = function() {
                return 2 === this.datePicked.length && this.datePicked[0].getTime() > this.datePicked[1].getTime();
            }, e.prototype.shouldCheckLockDays = function() {
                return this.options.disallowLockDaysInRange && this.options.lockDays.length && 2 === this.datePicked.length;
            }, e.prototype.shouldCheckPartiallyBookedDays = function() {
                return this.options.disallowPartiallyBookedDaysInRange && this.options.partiallyBookedDays.length && 2 === this.datePicked.length;
            }, e.prototype.shouldCheckHolidays = function() {
                return this.options.disallowHolidaysInRange && this.options.holidays.length && 2 === this.datePicked.length;
            }, e.prototype.shouldCheckBookedDays = function() {
                return this.options.disallowBookedDaysInRange && this.options.bookedDays.length && 2 === this.datePicked.length;
            }, e.prototype.onClick = function(t) {
                var e = this, i = t.target;
                if (i && this.picker) if (this.shouldShown(i)) this.show(i); else if (i.closest("." + p.litepicker)) if (i.classList.contains(p.dayItem)) {
                    if (t.preventDefault(), !this.isSamePicker(i)) return;
                    if (i.classList.contains(p.isLocked)) return;
                    if (i.classList.contains(p.isHoliday)) return;
                    if (i.classList.contains(p.isBooked)) return;
                    if (this.shouldResetDatePicked() && (this.datePicked.length = 0), this.datePicked[this.datePicked.length] = new c.DateTime(i.dataset.time), 
                    this.shouldSwapDatePicked()) {
                        var o = this.datePicked[1].clone();
                        this.datePicked[1] = this.datePicked[0].clone(), this.datePicked[0] = o.clone();
                    }
                    if (this.shouldCheckLockDays()) {
                        var n = this.options.lockDaysInclusivity;
                        this.options.lockDays.filter(function(t) {
                            return t instanceof Array ? t[0].isBetween(e.datePicked[0], e.datePicked[1], n) || t[1].isBetween(e.datePicked[0], e.datePicked[1], n) : t.isBetween(e.datePicked[0], e.datePicked[1], n);
                        }).length && (this.datePicked.length = 0, "function" == typeof this.options.onError && this.options.onError.call(this, "INVALID_RANGE"));
                    }
                    if (this.shouldCheckHolidays()) {
                        var s = this.options.holidaysInclusivity;
                        this.options.holidays.filter(function(t) {
                            return t instanceof Array ? t[0].isBetween(e.datePicked[0], e.datePicked[1], s) || t[1].isBetween(e.datePicked[0], e.datePicked[1], s) : t.isBetween(e.datePicked[0], e.datePicked[1], s);
                        }).length && (this.datePicked.length = 0, "function" == typeof this.options.onError && this.options.onError.call(this, "INVALID_RANGE"));
                    }
                    if (this.shouldCheckPartiallyBookedDays()) {
                        var a = this.options.partiallyBookedDaysInclusivity;
                        if (!(m = this.options.partiallyBookedDays.filter(function(t) {
                            return t instanceof Array ? t[0].isBetween(e.datePicked[0], e.datePicked[1], a) || t[1].isBetween(e.datePicked[0], e.datePicked[1], a) : t.isBetween(e.datePicked[0], e.datePicked[1]);
                        }).length) && this.datePicked[0].getDate() !== this.datePicked[1].getDate()) {
                            var r = this.datePicked[0].format(this.options.bookedDaysFormat), l = this.datePicked[1].format(this.options.bookedDaysFormat), d = this.options.days[r];
                            m = this.options.days[l].firstSlotBooked || d.lastSlotBooked;
                        }
                        var u = this.options.anyBookedDaysAsCheckout && 1 === this.datePicked.length;
                        m && !u && (this.datePicked.length = 0, "function" == typeof this.options.onError && this.options.onError.call(this, "INVALID_RANGE"));
                    }
                    if (this.shouldCheckBookedDays()) {
                        var m, f = this.options.bookedDaysInclusivity;
                        (m = this.options.bookedDays.filter(function(t) {
                            return t instanceof Array ? t[0].isBetween(e.datePicked[0], e.datePicked[1], f) || t[1].isBetween(e.datePicked[0], e.datePicked[1], f) : t.isBetween(e.datePicked[0], e.datePicked[1], f);
                        }).length) && (this.datePicked.length = 0, "function" == typeof this.options.onError && this.options.onError.call(this, "INVALID_RANGE"));
                    }
                    if (this.render(), this.options.autoApply) {
                        var y = !1;
                        this.options.singleMode && this.datePicked.length ? (this.setDate(this.datePicked[0]), 
                        this.hide(), y = !0) : this.options.singleMode || 2 !== this.datePicked.length || (this.setDateRange(this.datePicked[0], this.datePicked[1]), 
                        this.hide(), y = !0), "function" == typeof this.options.onAutoApply && this.options.onAutoApply.call(this, y);
                    }
                } else {
                    if (i.classList.contains(p.buttonPreviousMonth)) {
                        if (t.preventDefault(), !this.isSamePicker(i)) return;
                        var g = 0, k = this.options.moveByOneMonth ? 1 : this.options.numberOfMonths;
                        if (this.options.splitView) {
                            var D = i.closest("." + p.monthItem);
                            g = h.findNestedMonthItem(D), k = 1;
                        }
                        return this.calendars[g].setMonth(this.calendars[g].getMonth() - k), this.gotoDate(this.calendars[g], g), 
                        void ("function" == typeof this.options.onChangeMonth && this.options.onChangeMonth.call(this, this.calendars[g], g));
                    }
                    if (i.classList.contains(p.buttonNextMonth)) {
                        if (t.preventDefault(), !this.isSamePicker(i)) return;
                        return g = 0, k = this.options.moveByOneMonth ? 1 : this.options.numberOfMonths, 
                        this.options.splitView && (D = i.closest("." + p.monthItem), g = h.findNestedMonthItem(D), 
                        k = 1), this.calendars[g].setMonth(this.calendars[g].getMonth() + k), this.gotoDate(this.calendars[g], g), 
                        void ("function" == typeof this.options.onChangeMonth && this.options.onChangeMonth.call(this, this.calendars[g], g));
                    }
                    if (i.classList.contains(p.buttonCancel)) {
                        if (t.preventDefault(), !this.isSamePicker(i)) return;
                        this.hide();
                    }
                    if (i.classList.contains(p.buttonApply)) {
                        if (t.preventDefault(), !this.isSamePicker(i)) return;
                        this.options.singleMode && this.datePicked.length ? this.setDate(this.datePicked[0]) : this.options.singleMode || 2 !== this.datePicked.length || this.setDateRange(this.datePicked[0], this.datePicked[1]), 
                        this.hide();
                    }
                } else this.hide();
            }, e.prototype.showTooltip = function(t, e) {
                var i = this.picker.querySelector("." + p.containerTooltip);
                i.style.visibility = "visible", i.innerHTML = e;
                var o = this.picker.getBoundingClientRect(), n = i.getBoundingClientRect(), s = t.getBoundingClientRect(), a = s.top, r = s.left;
                if (this.options.inlineMode && this.options.parentEl) {
                    var l = this.picker.parentNode.getBoundingClientRect();
                    a -= l.top, r -= l.left;
                } else a -= o.top, r -= o.left;
                a -= n.height, r -= n.width / 2, r += s.width / 2, i.style.top = a + "px", i.style.left = r + "px";
            }, e.prototype.hideTooltip = function() {
                this.picker.querySelector("." + p.containerTooltip).style.visibility = "hidden";
            }, e.prototype.shouldAllowMouseEnter = function(t) {
                return !(this.options.singleMode || t.classList.contains(p.isLocked) || t.classList.contains(p.isHoliday) || t.classList.contains(p.isBooked));
            }, e.prototype.shouldAllowRepick = function() {
                return this.options.elementEnd && this.options.allowRepick && this.options.startDate && this.options.endDate;
            }, e.prototype.isDayItem = function(t) {
                return t.classList.contains(p.dayItem);
            }, e.prototype.onMouseEnter = function(t) {
                var e = this, i = t.target;
                if (this.isDayItem(i) && ("function" == typeof this.options.onDayHover && this.options.onDayHover.call(this, c.DateTime.parseDateTime(i.dataset.time), i.classList.toString().split(/\s/)), 
                this.shouldAllowMouseEnter(i))) {
                    if (this.shouldAllowRepick() && (this.triggerElement === this.options.element ? this.datePicked[0] = this.options.endDate.clone() : this.triggerElement === this.options.elementEnd && (this.datePicked[0] = this.options.startDate.clone())), 
                    1 !== this.datePicked.length) return;
                    var o = this.picker.querySelector("." + p.dayItem + '[data-time="' + this.datePicked[0].getTime() + '"]'), n = this.datePicked[0].clone(), s = new c.DateTime(i.dataset.time), a = !1;
                    if (n.getTime() > s.getTime()) {
                        var r = n.clone();
                        n = s.clone(), s = r.clone(), a = !0;
                    }
                    if (Array.prototype.slice.call(this.picker.querySelectorAll("." + p.dayItem)).forEach(function(t) {
                        var i = new c.DateTime(t.dataset.time), o = e.renderDay(i);
                        if (i.isBetween(n, s)) {
                            var a = e.options.days[i.format(e.options.bookedDaysFormat)];
                            a.bookedDay ? o.classList.add(p.isBooked) : a.partiallyBookedDay && (a.firstSlotBooked && o.classList.add(p.isPartiallyBookedStart), 
                            a.lastSlotBooked && o.classList.add(p.isPartiallyBookedEnd)), o.classList.add(p.isInRange);
                        }
                        t.className = o.className;
                    }), i.classList.add(p.isEndDate), a ? (o && o.classList.add(p.isFlipped), i.classList.add(p.isFlipped)) : (o && o.classList.remove(p.isFlipped), 
                    i.classList.remove(p.isFlipped)), this.options.showTooltip) {
                        var l = s.diff(n, "day");
                        if (this.options.hotelMode || (l += 1), l > 0) {
                            var d = this.pluralSelector(l), h = l + " " + (this.options.tooltipText[d] ? this.options.tooltipText[d] : "[" + d + "]");
                            this.showTooltip(i, h);
                        } else this.hideTooltip();
                    }
                }
            }, e.prototype.onMouseLeave = function(t) {
                t.target, this.options.allowRepick && (!this.options.allowRepick || this.options.startDate || this.options.endDate) && (this.datePicked.length = 0, 
                this.render());
            }, e.prototype.onInput = function(t) {
                var e = this.parseInput(), i = e[0], o = e[1], n = this.options.format;
                if (this.options.elementEnd ? i instanceof c.DateTime && o instanceof c.DateTime && i.format(n) === this.options.element.value && o.format(n) === this.options.elementEnd.value : this.options.singleMode ? i instanceof c.DateTime && i.format(n) === this.options.element.value : i instanceof c.DateTime && o instanceof c.DateTime && i.format(n) + " - " + o.format(n) === this.options.element.value) {
                    if (o && i.getTime() > o.getTime()) {
                        var s = i.clone();
                        i = o.clone(), o = s.clone();
                    }
                    this.options.startDate = new c.DateTime(i, this.options.format, this.options.lang), 
                    o && (this.options.endDate = new c.DateTime(o, this.options.format, this.options.lang)), 
                    this.updateInput(), this.render();
                    var a = i.clone(), r = 0;
                    (this.options.elementEnd ? i.format(n) === t.target.value : t.target.value.startWith(i.format(n))) || (a = o.clone(), 
                    r = this.options.numberOfMonths - 1), this.gotoDate(a, r);
                }
            }, e.prototype.isShowning = function() {
                return this.picker && "none" !== this.picker.style.display;
            }, e.prototype.loadPolyfillsForIE11 = function() {
                Object.entries || (Object.entries = function(t) {
                    for (var e = Object.keys(t), i = e.length, o = new Array(i); i; ) o[i -= 1] = [ e[i], t[e[i]] ];
                    return o;
                }), Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), 
                Element.prototype.closest || (Element.prototype.closest = function(t) {
                    var e = this;
                    do {
                        if (e.matches(t)) return e;
                        e = e.parentElement || e.parentNode;
                    } while (null !== e && 1 === e.nodeType);
                    return null;
                });
            }, e;
        }(d.Calendar);
        e.Litepicker = u;
    }, function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.Litepicker = void 0;
        var o = i(3);
        Object.defineProperty(e, "Litepicker", {
            enumerable: !0,
            get: function() {
                return o.Litepicker;
            }
        }), i(9), i(10), window.Litepicker = o.Litepicker, e.default = o.Litepicker;
    }, function(t, e, i) {
        "use strict";
        var o = this && this.__createBinding || (Object.create ? function(t, e, i, o) {
            void 0 === o && (o = i), Object.defineProperty(t, o, {
                enumerable: !0,
                get: function() {
                    return e[i];
                }
            });
        } : function(t, e, i, o) {
            void 0 === o && (o = i), t[o] = e[i];
        }), n = this && this.__setModuleDefault || (Object.create ? function(t, e) {
            Object.defineProperty(t, "default", {
                enumerable: !0,
                value: e
            });
        } : function(t, e) {
            t.default = e;
        }), s = this && this.__importStar || function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t) for (var i in t) "default" !== i && Object.hasOwnProperty.call(t, i) && o(e, t, i);
            return n(e, t), e;
        };
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.Calendar = void 0;
        var a = i(0), r = s(i(1)), l = i(2), d = function() {
            function t() {
                this.options = {
                    element: null,
                    elementEnd: null,
                    parentEl: null,
                    firstDay: 1,
                    format: "YYYY-MM-DD",
                    lang: "en-US",
                    numberOfMonths: 1,
                    numberOfColumns: 1,
                    startDate: null,
                    endDate: null,
                    zIndex: 9999,
                    minDate: null,
                    maxDate: null,
                    minDays: null,
                    maxDays: null,
                    selectForward: !1,
                    selectBackward: !1,
                    splitView: !1,
                    inlineMode: !1,
                    singleMode: !0,
                    autoApply: !0,
                    allowRepick: !1,
                    showWeekNumbers: !1,
                    showTooltip: !0,
                    hotelMode: !1,
                    disableWeekends: !1,
                    scrollToDate: !0,
                    mobileFriendly: !0,
                    useResetBtn: !1,
                    autoRefresh: !1,
                    moveByOneMonth: !1,
                    days: [],
                    lockDaysFormat: "YYYY-MM-DD",
                    lockDays: [],
                    disallowLockDaysInRange: !0,
                    lockDaysInclusivity: "[]",
                    holidaysFormat: "YYYY-MM-DD",
                    holidays: [],
                    disallowHolidaysInRange: !1,
                    holidaysInclusivity: "[]",
                    partiallyBookedDaysFormat: "YYYY-MM-DD",
                    partiallyBookedDays: [],
                    disallowPartiallyBookedDaysInRange: !0,
                    partiallyBookedDaysInclusivity: "[]",
                    anyPartiallyBookedDaysAsCheckout: !1,
                    bookedDaysFormat: "YYYY-MM-DD",
                    bookedDays: [],
                    disallowBookedDaysInRange: !0,
                    bookedDaysInclusivity: "[]",
                    anyBookedDaysAsCheckout: !1,
                    highlightedDaysFormat: "YYYY-MM-DD",
                    highlightedDays: [],
                    dropdowns: {
                        minYear: 1990,
                        maxYear: null,
                        months: !1,
                        years: !1
                    },
                    buttonText: {
                        apply: "Apply",
                        cancel: "Cancel",
                        nextMonth: '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M2.748 16L0 13.333 5.333 8 0 2.667 2.748 0l7.919 8z" fill-rule="nonzero"/></svg>',
                        previousMonth: '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M7.919 0l2.748 2.667L5.333 8l5.334 5.333L7.919 16 0 8z" fill-rule="nonzero"/></svg>',
                        reset: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">\n        <path d="M0 0h24v24H0z" fill="none"/>\n        <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>\n      </svg>'
                    },
                    tooltipText: {
                        one: "day",
                        other: "days"
                    },
                    tooltipPluralSelector: null,
                    onShow: null,
                    onHide: null,
                    onSelect: null,
                    onError: null,
                    onRender: null,
                    onRenderDay: null,
                    onAutoApply: null,
                    onChangeMonth: null,
                    onChangeYear: null,
                    onDayHover: null,
                    resetBtnCallback: null,
                    moduleRanges: null,
                    moduleNavKeyboard: null
                }, this.calendars = [], this.datePicked = [];
            }
            return t.prototype.render = function() {
                var t = this, e = document.createElement("div");
                e.className = r.containerMain;
                var i = document.createElement("div");
                i.className = r.containerMonths, r["columns" + this.options.numberOfColumns] && (i.classList.remove(r.columns2, r.columns3, r.columns4), 
                i.classList.add(r["columns" + this.options.numberOfColumns])), this.options.splitView && i.classList.add(r.splitView), 
                this.options.showWeekNumbers && i.classList.add(r.showWeekNumbers);
                for (var o = this.calendars[0].clone(), n = o.getMonth(), s = o.getMonth() + this.options.numberOfMonths, a = 0, l = n; l < s; l += 1) {
                    var d = o.clone();
                    d.setDate(1), this.options.splitView ? d = this.calendars[a].clone() : d.setMonth(l), 
                    i.appendChild(this.renderMonth(d)), a += 1;
                }
                if (this.picker.innerHTML = "", e.appendChild(i), this.options.useResetBtn) {
                    var c = document.createElement("a");
                    c.href = "#", c.className = r.resetButton, c.innerHTML = this.options.buttonText.reset, 
                    c.addEventListener("click", function(e) {
                        e.preventDefault(), t.clearSelection(), "function" == typeof t.options.resetBtnCallback && t.options.resetBtnCallback.call(t);
                    }), e.querySelector("." + r.monthItem + ":last-child").querySelector("." + r.monthItemHeader).appendChild(c);
                }
                this.picker.appendChild(e), this.options.autoApply && !this.options.footerHTML || this.picker.appendChild(this.renderFooter()), 
                this.options.showTooltip && this.picker.appendChild(this.renderTooltip()), this.options.moduleRanges && "function" == typeof this.enableModuleRanges && this.enableModuleRanges.call(this, this), 
                "function" == typeof this.options.onRender && this.options.onRender.call(this, this.picker);
            }, t.prototype.renderMonth = function(t) {
                var e = this, i = t.clone(), o = 32 - new Date(i.getFullYear(), i.getMonth(), 32).getDate(), n = document.createElement("div");
                n.className = r.monthItem;
                var s = document.createElement("div");
                s.className = r.monthItemHeader;
                var d = document.createElement("div");
                if (this.options.dropdowns.months) {
                    var c = document.createElement("select");
                    c.className = r.monthItemName;
                    for (var p = 0; p < 12; p += 1) {
                        var h = document.createElement("option"), u = new a.DateTime(new Date(t.getFullYear(), p, 1, 0, 0, 0));
                        h.value = String(p), h.text = u.toLocaleString(this.options.lang, {
                            month: "long"
                        }), h.disabled = this.options.minDate && u.isBefore(new a.DateTime(this.options.minDate), "month") || this.options.maxDate && u.isAfter(new a.DateTime(this.options.maxDate), "month"), 
                        h.selected = u.getMonth() === t.getMonth(), c.appendChild(h);
                    }
                    c.addEventListener("change", function(t) {
                        var i = t.target, o = 0;
                        if (e.options.splitView) {
                            var n = i.closest("." + r.monthItem);
                            o = l.findNestedMonthItem(n);
                        }
                        e.calendars[o].setMonth(Number(i.value)), e.render(), "function" == typeof e.options.onChangeMonth && e.options.onChangeMonth.call(e, e.calendars[o], o);
                    }), d.appendChild(c);
                } else {
                    var m = document.createElement("strong");
                    m.className = r.monthItemName, m.innerHTML = t.toLocaleString(this.options.lang, {
                        month: "long"
                    }), d.appendChild(m);
                }
                if (this.options.dropdowns.years) {
                    var f = document.createElement("select");
                    f.className = r.monthItemYear;
                    var y = this.options.dropdowns.minYear, g = this.options.dropdowns.maxYear ? this.options.dropdowns.maxYear : new Date().getFullYear();
                    for (t.getFullYear() > g && ((h = document.createElement("option")).value = String(t.getFullYear()), 
                    h.text = String(t.getFullYear()), h.selected = !0, h.disabled = !0, f.appendChild(h)), 
                    p = g; p >= y; p -= 1) {
                        h = document.createElement("option");
                        var k = new a.DateTime(new Date(p, 0, 1, 0, 0, 0));
                        h.value = p, h.text = p, h.disabled = this.options.minDate && k.isBefore(new a.DateTime(this.options.minDate), "year") || this.options.maxDate && k.isAfter(new a.DateTime(this.options.maxDate), "year"), 
                        h.selected = t.getFullYear() === p, f.appendChild(h);
                    }
                    t.getFullYear() < y && ((h = document.createElement("option")).value = String(t.getFullYear()), 
                    h.text = String(t.getFullYear()), h.selected = !0, h.disabled = !0, f.appendChild(h)), 
                    f.addEventListener("change", function(t) {
                        var i = t.target, o = 0;
                        if (e.options.splitView) {
                            var n = i.closest("." + r.monthItem);
                            o = l.findNestedMonthItem(n);
                        }
                        e.calendars[o].setFullYear(Number(i.value)), e.render(), "function" == typeof e.options.onChangeYear && e.options.onChangeYear.call(e, e.calendars[o], o);
                    }), d.appendChild(f);
                } else {
                    var D = document.createElement("span");
                    D.className = r.monthItemYear, D.innerHTML = String(t.getFullYear()), d.appendChild(D);
                }
                var v = document.createElement("a");
                v.href = "#", v.className = r.buttonPreviousMonth, v.innerHTML = this.options.buttonText.previousMonth;
                var b = document.createElement("a");
                b.href = "#", b.className = r.buttonNextMonth, b.innerHTML = this.options.buttonText.nextMonth, 
                s.appendChild(v), s.appendChild(d), s.appendChild(b), this.options.minDate && i.isSameOrBefore(new a.DateTime(this.options.minDate), "month") && n.classList.add(r.noPreviousMonth), 
                this.options.maxDate && i.isSameOrAfter(new a.DateTime(this.options.maxDate), "month") && n.classList.add(r.noNextMonth);
                var w = document.createElement("div");
                w.className = r.monthItemWeekdaysRow, this.options.showWeekNumbers && (w.innerHTML = "<div>W</div>");
                for (var M = 1; M <= 7; M += 1) {
                    var x = 3 + this.options.firstDay + M, B = document.createElement("div");
                    B.innerHTML = this.weekdayName(x), B.title = this.weekdayName(x, "long"), w.appendChild(B);
                }
                var _ = document.createElement("div");
                _.className = r.containerDays;
                var T = this.calcSkipDays(i);
                this.options.showWeekNumbers && T && _.appendChild(this.renderWeekNumber(i));
                for (var I = 0; I < T; I += 1) {
                    var L = document.createElement("div");
                    _.appendChild(L);
                }
                for (I = 1; I <= o; I += 1) i.setDate(I), this.options.showWeekNumbers && i.getDay() === this.options.firstDay && _.appendChild(this.renderWeekNumber(i)), 
                _.appendChild(this.renderDay(i));
                return n.appendChild(s), n.appendChild(w), n.appendChild(_), n;
            }, t.prototype.renderDay = function(t) {
                var e = this;
                t.setHours();
                var i = document.createElement("a");
                if (i.href = "#", i.className = r.dayItem, i.innerHTML = String(t.getDate()), i.dataset.time = String(t.getTime()), 
                t.toDateString() === new Date().toDateString() && i.classList.add(r.isToday), this.datePicked.length ? (this.datePicked[0].toDateString() === t.toDateString() && (i.classList.add(r.isStartDate), 
                this.options.singleMode && i.classList.add(r.isEndDate)), 2 === this.datePicked.length && this.datePicked[1].toDateString() === t.toDateString() && i.classList.add(r.isEndDate), 
                2 === this.datePicked.length && t.isBetween(this.datePicked[0], this.datePicked[1]) && i.classList.add(r.isInRange)) : this.options.startDate && (this.options.startDate.toDateString() === t.toDateString() && (i.classList.add(r.isStartDate), 
                this.options.singleMode && i.classList.add(r.isEndDate)), this.options.endDate && this.options.endDate.toDateString() === t.toDateString() && i.classList.add(r.isEndDate), 
                this.options.startDate && this.options.endDate && t.isBetween(this.options.startDate, this.options.endDate) && i.classList.add(r.isInRange)), 
                this.options.minDate && t.isBefore(new a.DateTime(this.options.minDate)) && i.classList.add(r.isLocked), 
                this.options.maxDate && t.isAfter(new a.DateTime(this.options.maxDate)) && i.classList.add(r.isLocked), 
                this.options.minDays && 1 === this.datePicked.length) {
                    var o = Number(!this.options.hotelMode), n = this.datePicked[0].clone().subtract(this.options.minDays - o, "day"), s = this.datePicked[0].clone().add(this.options.minDays - o, "day");
                    t.isBetween(n, this.datePicked[0], "(]") && i.classList.add(r.isLocked), t.isBetween(this.datePicked[0], s, "[)") && i.classList.add(r.isLocked);
                }
                if (this.options.maxDays && 1 === this.datePicked.length && (o = Number(this.options.hotelMode), 
                n = this.datePicked[0].clone().subtract(this.options.maxDays + o, "day"), s = this.datePicked[0].clone().add(this.options.maxDays + o, "day"), 
                t.isSameOrBefore(n) && i.classList.add(r.isLocked), t.isSameOrAfter(s) && i.classList.add(r.isLocked)), 
                this.options.selectForward && 1 === this.datePicked.length && t.isBefore(this.datePicked[0]) && i.classList.add(r.isLocked), 
                this.options.selectBackward && 1 === this.datePicked.length && t.isAfter(this.datePicked[0]) && i.classList.add(r.isLocked), 
                this.options.selectForward && 1 === this.datePicked.length && t.isBefore(this.datePicked[0]) && i.classList.add(r.isHoliday), 
                this.options.selectBackward && 1 === this.datePicked.length && t.isAfter(this.datePicked[0]) && i.classList.add(r.isHoliday), 
                this.options.lockDays.length && this.options.lockDays.filter(function(i) {
                    return i instanceof Array ? t.isBetween(i[0], i[1], e.options.lockDaysInclusivity) : i.isSame(t, "day");
                }).length && i.classList.add(r.isLocked), this.options.bookedDays.length && (c = this.options.bookedDays.filter(function(i) {
                    return i instanceof Array ? t.isBetween(i[0], i[1], e.options.bookedDaysInclusivity) : i.isSame(t, "day");
                }).length) && i.classList.add(r.isBooked), this.options.partiallyBookedDays.length && (y = this.options.partiallyBookedDays.filter(function(i) {
                    return i instanceof Array ? t.isBetween(i[0], i[1], e.options.partiallyBookedDaysInclusivity) : i.isSame(t, "day");
                }).length) && (!1 === (f = this.options.days[t.format(this.options.format)]).firstSlotBooked && i.classList.add(r.isPartiallyBookedStart), 
                !1 === f.lastSlotBooked && i.classList.add(r.isPartiallyBookedEnd)), this.options.holidays.length && this.options.holidays.filter(function(i) {
                    return i instanceof Array ? t.isBetween(i[0], i[1], e.options.holidaysInclusivity) : i.isSame(t, "day");
                }).length && i.classList.add(r.isHoliday), this.options.highlightedDays.length && this.options.highlightedDays.filter(function(e) {
                    return e instanceof Array ? t.isBetween(e[0], e[1], "[]") : e.isSame(t, "day");
                }).length && i.classList.add(r.isHighlighted), this.datePicked.length <= 1) {
                    var l = t.clone();
                    if (l.subtract(1, "day"), t.clone().add(1, "day"), this.options.bookedDays.length) {
                        var d = this.options.bookedDaysInclusivity;
                        this.options.hotelMode && 1 === this.datePicked.length && (d = "()");
                        var c = this.dateIsBooked(t, d), p = this.dateIsBooked(l, "[]"), h = this.dateIsBooked(t, "(]"), u = 0 === this.datePicked.length && c || 1 === this.datePicked.length && p && c || 1 === this.datePicked.length && p && h, m = this.options.anyBookedDaysAsCheckout && 1 === this.datePicked.length;
                        u && !m && i.classList.add(r.isBooked);
                    }
                    if (this.options.partiallyBookedDays.length) {
                        d = this.options.partiallyBookedDaysInclusivity, this.options.hotelMode && 1 === this.datePicked.length && (d = "()");
                        var f, y = this.dateIsPartiallyBooked(t, d), g = (p = this.dateIsPartiallyBooked(l, "[]"), 
                        h = this.dateIsPartiallyBooked(t, "(]"), 0 === this.datePicked.length && y || 1 === this.datePicked.length && p && y || 1 === this.datePicked.length && p && h), k = this.options.anyPartiallyBookedDaysAsCheckout && 1 === this.datePicked.length;
                        g && !k && (!1 === (f = this.options.days[t.format(this.options.format)]).firstSlotBooked && i.classList.add(r.isPartiallyBookedStart), 
                        !1 === f.lastSlotBooked && i.classList.add(r.isPartiallyBookedEnd));
                    }
                }
                return !this.options.disableWeekends || 6 !== t.getDay() && 0 !== t.getDay() || i.classList.add(r.isLocked), 
                "function" == typeof this.options.onRenderDay && this.options.onRenderDay.call(this, i), 
                i;
            }, t.prototype.renderFooter = function() {
                var t = document.createElement("div");
                if (t.className = r.containerFooter, this.options.footerHTML ? t.innerHTML = this.options.footerHTML : t.innerHTML = '\n      <span class="' + r.previewDateRange + '"></span>\n      <button type="button" class="' + r.buttonCancel + '">' + this.options.buttonText.cancel + '</button>\n      <button type="button" class="' + r.buttonApply + '">' + this.options.buttonText.apply + "</button>\n      ", 
                this.options.singleMode) {
                    if (1 === this.datePicked.length) {
                        var e = this.datePicked[0].format(this.options.format, this.options.lang);
                        t.querySelector("." + r.previewDateRange).innerHTML = e;
                    }
                } else if (1 === this.datePicked.length && t.querySelector("." + r.buttonApply).setAttribute("disabled", ""), 
                2 === this.datePicked.length) {
                    e = this.datePicked[0].format(this.options.format, this.options.lang);
                    var i = this.datePicked[1].format(this.options.format, this.options.lang);
                    t.querySelector("." + r.previewDateRange).innerHTML = e + " - " + i;
                }
                return t;
            }, t.prototype.renderWeekNumber = function(t) {
                var e = document.createElement("div"), i = t.getWeek(this.options.firstDay);
                return e.className = r.weekNumber, e.innerHTML = 53 === i && 0 === t.getMonth() ? "53 / 1" : i, 
                e;
            }, t.prototype.renderTooltip = function() {
                var t = document.createElement("div");
                return t.className = r.containerTooltip, t;
            }, t.prototype.dateIsBooked = function(t, e) {
                return this.options.bookedDays.filter(function(i) {
                    return i instanceof Array ? t.isBetween(i[0], i[1], e) : i.isSame(t, "day");
                }).length;
            }, t.prototype.dateIsPartiallyBooked = function(t, e) {
                return this.options.partiallyBookedDays.filter(function(i) {
                    return i instanceof Array ? t.isBetween(i[0], i[1], e) : i.isSame(t, "day");
                }).length;
            }, t.prototype.weekdayName = function(t, e) {
                return void 0 === e && (e = "short"), new Date(1970, 0, t, 12, 0, 0, 0).toLocaleString(this.options.lang, {
                    weekday: e
                });
            }, t.prototype.calcSkipDays = function(t) {
                var e = t.getDay() - this.options.firstDay;
                return e < 0 && (e += 7), e;
            }, t;
        }();
        e.Calendar = d;
    }, function(t, e, i) {
        "use strict";
        var o, s = function() {
            var t = {};
            return function(e) {
                if (void 0 === t[e]) {
                    var i = document.querySelector(e);
                    if (window.HTMLIFrameElement && i instanceof window.HTMLIFrameElement) try {
                        i = i.contentDocument.head;
                    } catch (t) {
                        i = null;
                    }
                    t[e] = i;
                }
                return t[e];
            };
        }(), a = [];
        function r(t) {
            for (var e = -1, i = 0; i < a.length; i++) if (a[i].identifier === t) {
                e = i;
                break;
            }
            return e;
        }
        function l(t, e) {
            for (var i = {}, o = [], n = 0; n < t.length; n++) {
                var s = t[n], l = e.base ? s[0] + e.base : s[0], d = i[l] || 0, c = "".concat(l, " ").concat(d);
                i[l] = d + 1;
                var p = r(c), h = {
                    css: s[1],
                    media: s[2],
                    sourceMap: s[3]
                };
                -1 !== p ? (a[p].references++, a[p].updater(h)) : a.push({
                    identifier: c,
                    updater: y(h, e),
                    references: 1
                }), o.push(c);
            }
            return o;
        }
        function d(t) {
            var e = document.createElement("style"), o = t.attributes || {};
            if (void 0 === o.nonce) {
                var n = i.nc;
                n && (o.nonce = n);
            }
            if (Object.keys(o).forEach(function(t) {
                e.setAttribute(t, o[t]);
            }), "function" == typeof t.insert) t.insert(e); else {
                var a = s(t.insert || "head");
                if (!a) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
                a.appendChild(e);
            }
            return e;
        }
        var c, p = (c = [], function(t, e) {
            return c[t] = e, c.filter(Boolean).join("\n");
        });
        function h(t, e, i, o) {
            var n = i ? "" : o.media ? "@media ".concat(o.media, " {").concat(o.css, "}") : o.css;
            if (t.styleSheet) t.styleSheet.cssText = p(e, n); else {
                var s = document.createTextNode(n), a = t.childNodes;
                a[e] && t.removeChild(a[e]), a.length ? t.insertBefore(s, a[e]) : t.appendChild(s);
            }
        }
        var m = null, f = 0;
        function y(t, e) {
            var i, o, n;
            if (e.singleton) {
                var s = f++;
                i = m || (m = d(e)), o = h.bind(null, i, s, !1), n = h.bind(null, i, s, !0);
            } else i = d(e), o = function(t, e, i) {
                var o = i.css, n = i.media, s = i.sourceMap;
                if (n ? t.setAttribute("media", n) : t.removeAttribute("media"), s && btoa && (o += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s)))), " */")), 
                t.styleSheet) t.styleSheet.cssText = o; else {
                    for (;t.firstChild; ) t.removeChild(t.firstChild);
                    t.appendChild(document.createTextNode(o));
                }
            }.bind(null, i, e), n = function() {
                !function(t) {
                    if (null === t.parentNode) return !1;
                    t.parentNode.removeChild(t);
                }(i);
            };
            return o(t), function(e) {
                if (e) {
                    if (e.css === t.css && e.media === t.media && e.sourceMap === t.sourceMap) return;
                    o(t = e);
                } else n();
            };
        }
        t.exports = function(t, e) {
            (e = e || {}).singleton || "boolean" == typeof e.singleton || (e.singleton = (void 0 === o && (o = Boolean(window && document && document.all && !window.atob)), 
            o));
            var i = l(t = t || [], e);
            return function(t) {
                if (t = t || [], "[object Array]" === Object.prototype.toString.call(t)) {
                    for (var o = 0; o < i.length; o++) {
                        var n = r(i[o]);
                        a[n].references--;
                    }
                    for (var s = l(t, e), d = 0; d < i.length; d++) {
                        var c = r(i[d]);
                        0 === a[c].references && (a[c].updater(), a.splice(c, 1));
                    }
                    i = s;
                }
            };
        };
    }, function(t, e, i) {
        (e = i(8)(!1)).push([ t.i, ':root{--litepickerBgColor: #fff;--litepickerMonthHeaderTextColor: #333;--litepickerMonthButton: #9e9e9e;--litepickerMonthButtonHover: #2196f3;--litepickerMonthWidth: calc(var(--litepickerDayWidth) * 7);--litepickerMonthWeekdayColor: #9e9e9e;--litepickerDayColor: #333;--litepickerDayColorBg: #20c527;--litepickerDayColorHover: #2196f3;--litepickerDayIsTodayColor: #f44336;--litepickerDayIsInRange: #bbdefb;--litepickerDayIsLockedColor: #9e9e9e;--litepickerDayIsLockedColorBg: #a0a0a0;--litepickerDayIsHolidayColor: #000000;--litepickerDayIsHolidayColorBg: #ff9218;--litepickerDayIsBookedColor: #9e9e9e;--litepickerDayIsBookedColorBg: #f06f6f;--litepickerDayIsPartiallyBookedColor: #9e9e9e;--litepickerDayIsStartColor: #fff;--litepickerDayIsStartBg: #2196f3;--litepickerDayIsEndColor: #fff;--litepickerDayIsEndBg: #2196f3;--litepickerDayWidth: 38px;--litepickerButtonCancelColor: #fff;--litepickerButtonCancelBg: #9e9e9e;--litepickerButtonApplyColor: #fff;--litepickerButtonApplyBg: #2196f3;--litepickerButtonResetBtn: #909090;--litepickerButtonResetBtnHover: #2196f3;--litepickerHighlightedDayColor: #333;--litepickerHighlightedDayBg: #ffeb3b}.show-week-numbers{--litepickerMonthWidth: calc(var(--litepickerDayWidth) * 8)}.litepicker{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;font-size:0.8em;display:none}.litepicker .container__main{display:-webkit-box;display:-ms-flexbox;display:flex}.litepicker .container__months{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;background-color:var(--litepickerBgColor);border-radius:5px;-webkit-box-shadow:0 0 5px #ddd;box-shadow:0 0 5px #ddd;width:calc(var(--litepickerMonthWidth) + 10px);-webkit-box-sizing:content-box;box-sizing:content-box}.litepicker .container__months.columns-2{width:calc((var(--litepickerMonthWidth) * 2) + 20px)}.litepicker .container__months.columns-3{width:calc((var(--litepickerMonthWidth) * 3) + 30px)}.litepicker .container__months.columns-4{width:calc((var(--litepickerMonthWidth) * 4) + 40px)}.litepicker .container__months.split-view .month-item-header .button-previous-month,.litepicker .container__months.split-view .month-item-header .button-next-month{visibility:visible}.litepicker .container__months .month-item{padding:5px;width:var(--litepickerMonthWidth);-webkit-box-sizing:content-box;box-sizing:content-box}.litepicker .container__months .month-item-header{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;font-weight:500;padding:10px 5px;text-align:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;color:var(--litepickerMonthHeaderTextColor)}.litepicker .container__months .month-item-header div{-webkit-box-flex:1;-ms-flex:1;flex:1}.litepicker .container__months .month-item-header div>.month-item-name{margin-right:5px}.litepicker .container__months .month-item-header div>.month-item-year{padding:0}.litepicker .container__months .month-item-header .reset-button{color:var(--litepickerButtonResetBtn)}.litepicker .container__months .month-item-header .reset-button>svg,.litepicker .container__months .month-item-header .reset-button>img{fill:var(--litepickerButtonResetBtn);pointer-events:none}.litepicker .container__months .month-item-header .reset-button:hover{color:var(--litepickerButtonResetBtnHover)}.litepicker .container__months .month-item-header .reset-button:hover>svg{fill:var(--litepickerButtonResetBtnHover)}.litepicker .container__months .month-item-header .button-previous-month,.litepicker .container__months .month-item-header .button-next-month{visibility:hidden;text-decoration:none;color:var(--litepickerMonthButton);padding:3px 5px;border-radius:3px;-webkit-transition:color 0.3s, border 0.3s;transition:color 0.3s, border 0.3s;cursor:default}.litepicker .container__months .month-item-header .button-previous-month>svg,.litepicker .container__months .month-item-header .button-previous-month>img,.litepicker .container__months .month-item-header .button-next-month>svg,.litepicker .container__months .month-item-header .button-next-month>img{fill:var(--litepickerMonthButton);pointer-events:none}.litepicker .container__months .month-item-header .button-previous-month:hover,.litepicker .container__months .month-item-header .button-next-month:hover{color:var(--litepickerMonthButtonHover)}.litepicker .container__months .month-item-header .button-previous-month:hover>svg,.litepicker .container__months .month-item-header .button-next-month:hover>svg{fill:var(--litepickerMonthButtonHover)}.litepicker .container__months .month-item-weekdays-row{display:-webkit-box;display:-ms-flexbox;display:flex;justify-self:center;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;color:var(--litepickerMonthWeekdayColor)}.litepicker .container__months .month-item-weekdays-row>div{padding:5px 0;font-size:85%;-webkit-box-flex:1;-ms-flex:1;flex:1;width:var(--litepickerDayWidth);text-align:center}.litepicker .container__months .month-item:first-child .button-previous-month{visibility:visible}.litepicker .container__months .month-item:last-child .button-next-month{visibility:visible}.litepicker .container__months .month-item.no-previous-month .button-previous-month{visibility:hidden}.litepicker .container__months .month-item.no-next-month .button-next-month{visibility:hidden}.litepicker .container__days{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;justify-self:center;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;text-align:center;-webkit-box-sizing:content-box;box-sizing:content-box}.litepicker .container__days>div,.litepicker .container__days>a{padding:5px 0;width:var(--litepickerDayWidth)}.litepicker .container__days .day-item{color:var(--litepickerDayColor);text-align:center;text-decoration:none;border-radius:3px;-webkit-transition:color 0.3s, border 0.3s;transition:color 0.3s, border 0.3s;cursor:default}.litepicker .container__days .day-item:hover{color:var(--litepickerDayColorHover);-webkit-box-shadow:inset 0 0 0 1px var(--litepickerDayColorHover);box-shadow:inset 0 0 0 1px var(--litepickerDayColorHover)}.litepicker .container__days .day-item.is-today{color:var(--litepickerDayIsTodayColor)}.litepicker .container__days .day-item.is-locked{color:var(--litepickerDayIsLockedColor)}.litepicker .container__days .day-item.is-locked:hover{color:var(--litepickerDayIsLockedColor);-webkit-box-shadow:none;box-shadow:none;cursor:default}.litepicker .container__days .day-item.is-holiday{background-color:orange}.litepicker .container__days .day-item.is-holiday:hover{color:var(--litepickerDayIsLockedColor);-webkit-box-shadow:none;box-shadow:none;cursor:default}.litepicker .container__days .day-item.is-partially-booked-start{background:-webkit-gradient(linear, left top, right bottom, from(var(--litepickerDayColorBg)), color-stop(50%, var(--litepickerDayColorBg)), color-stop(50%, var(--litepickerDayIsBookedColorBg)), to(var(--litepickerDayIsBookedColorBg)));background:linear-gradient(to bottom right, var(--litepickerDayColorBg) 0%, var(--litepickerDayColorBg) 50%, var(--litepickerDayIsBookedColorBg) 50%, var(--litepickerDayIsBookedColorBg) 100%)}.litepicker .container__days .day-item.is-partially-booked-end{background:-webkit-gradient(linear, right bottom, left top, from(var(--litepickerDayColorBg)), color-stop(50%, var(--litepickerDayColorBg)), color-stop(50%, var(--litepickerDayIsBookedColorBg)), to(var(--litepickerDayIsBookedColorBg)));background:linear-gradient(to top left, var(--litepickerDayColorBg) 0%, var(--litepickerDayColorBg) 50%, var(--litepickerDayIsBookedColorBg) 50%, var(--litepickerDayIsBookedColorBg) 100%)}.litepicker .container__days .day-item.is-booked{color:var(--litepickerDayIsBookedColor)}.litepicker .container__days .day-item.is-booked:hover{color:var(--litepickerDayIsBookedColor);-webkit-box-shadow:none;box-shadow:none;cursor:default}.litepicker .container__days .day-item.is-in-range{background-color:var(--litepickerDayIsInRange);border-radius:0}.litepicker .container__days .day-item.is-start-date{color:var(--litepickerDayIsStartColor);background-color:var(--litepickerDayIsStartBg);border-top-left-radius:5px;border-bottom-left-radius:5px;border-top-right-radius:0;border-bottom-right-radius:0}.litepicker .container__days .day-item.is-start-date.is-flipped{border-top-left-radius:0;border-bottom-left-radius:0;border-top-right-radius:5px;border-bottom-right-radius:5px}.litepicker .container__days .day-item.is-end-date{color:var(--litepickerDayIsEndColor);background-color:var(--litepickerDayIsEndBg);border-top-left-radius:0;border-bottom-left-radius:0;border-top-right-radius:5px;border-bottom-right-radius:5px}.litepicker .container__days .day-item.is-end-date.is-flipped{border-top-left-radius:5px;border-bottom-left-radius:5px;border-top-right-radius:0;border-bottom-right-radius:0}.litepicker .container__days .day-item.is-start-date.is-end-date{border-top-left-radius:5px;border-bottom-left-radius:5px;border-top-right-radius:5px;border-bottom-right-radius:5px}.litepicker .container__days .day-item.is-highlighted{color:var(--litepickerHighlightedDayColor);background-color:var(--litepickerHighlightedDayBg)}.litepicker .container__days .week-number{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;color:#9e9e9e;font-size:85%}.litepicker .container__footer{text-align:right;padding:10px 5px;margin:0 5px;background-color:#fafafa;-webkit-box-shadow:inset 0px 3px 3px 0px #ddd;box-shadow:inset 0px 3px 3px 0px #ddd;border-bottom-left-radius:5px;border-bottom-right-radius:5px}.litepicker .container__footer .preview-date-range{margin-right:10px;font-size:90%}.litepicker .container__footer .button-cancel{background-color:var(--litepickerButtonCancelBg);color:var(--litepickerButtonCancelColor);border:0;padding:3px 7px 4px;border-radius:3px}.litepicker .container__footer .button-cancel>svg,.litepicker .container__footer .button-cancel>img{pointer-events:none}.litepicker .container__footer .button-apply{background-color:var(--litepickerButtonApplyBg);color:var(--litepickerButtonApplyColor);border:0;padding:3px 7px 4px;border-radius:3px;margin-left:10px;margin-right:10px}.litepicker .container__footer .button-apply:disabled{opacity:0.7}.litepicker .container__footer .button-apply>svg,.litepicker .container__footer .button-apply>img{pointer-events:none}.litepicker .container__tooltip{position:absolute;margin-top:-4px;padding:4px 8px;border-radius:4px;background-color:#fff;-webkit-box-shadow:0 1px 3px rgba(0,0,0,0.25);box-shadow:0 1px 3px rgba(0,0,0,0.25);white-space:nowrap;font-size:11px;pointer-events:none;visibility:hidden}.litepicker .container__tooltip:before{position:absolute;bottom:-5px;left:calc(50% - 5px);border-top:5px solid rgba(0,0,0,0.12);border-right:5px solid transparent;border-left:5px solid transparent;content:""}.litepicker .container__tooltip:after{position:absolute;bottom:-4px;left:calc(50% - 4px);border-top:4px solid #fff;border-right:4px solid transparent;border-left:4px solid transparent;content:""}.litepicker-open{overflow:hidden}.litepicker-backdrop{display:none;background-color:#000;opacity:0.3;position:fixed;top:0;right:0;bottom:0;left:0}\n', "" ]), 
        e.locals = {
            showWeekNumbers: "show-week-numbers",
            litepicker: "litepicker",
            containerMain: "container__main",
            containerMonths: "container__months",
            columns2: "columns-2",
            columns3: "columns-3",
            columns4: "columns-4",
            splitView: "split-view",
            monthItemHeader: "month-item-header",
            buttonPreviousMonth: "button-previous-month",
            buttonNextMonth: "button-next-month",
            monthItem: "month-item",
            monthItemName: "month-item-name",
            monthItemYear: "month-item-year",
            resetButton: "reset-button",
            monthItemWeekdaysRow: "month-item-weekdays-row",
            noPreviousMonth: "no-previous-month",
            noNextMonth: "no-next-month",
            containerDays: "container__days",
            dayItem: "day-item",
            isToday: "is-today",
            isLocked: "is-locked",
            isHoliday: "is-holiday",
            isPartiallyBookedStart: "is-partially-booked-start",
            isPartiallyBookedEnd: "is-partially-booked-end",
            isBooked: "is-booked",
            isInRange: "is-in-range",
            isStartDate: "is-start-date",
            isFlipped: "is-flipped",
            isEndDate: "is-end-date",
            isHighlighted: "is-highlighted",
            weekNumber: "week-number",
            containerFooter: "container__footer",
            previewDateRange: "preview-date-range",
            buttonCancel: "button-cancel",
            buttonApply: "button-apply",
            containerTooltip: "container__tooltip",
            litepickerOpen: "litepicker-open",
            litepickerBackdrop: "litepicker-backdrop"
        }, t.exports = e;
    }, function(t, e, i) {
        "use strict";
        t.exports = function(t) {
            var e = [];
            return e.toString = function() {
                return this.map(function(e) {
                    var i = function(t, e) {
                        var a, r, l, i = t[1] || "", o = t[3];
                        if (!o) return i;
                        if (e && "function" == typeof btoa) {
                            var n = (a = o, r = btoa(unescape(encodeURIComponent(JSON.stringify(a)))), l = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(r), 
                            "/*# ".concat(l, " */")), s = o.sources.map(function(t) {
                                return "/*# sourceURL=".concat(o.sourceRoot || "").concat(t, " */");
                            });
                            return [ i ].concat(s).concat([ n ]).join("\n");
                        }
                        return [ i ].join("\n");
                    }(e, t);
                    return e[2] ? "@media ".concat(e[2], " {").concat(i, "}") : i;
                }).join("");
            }, e.i = function(t, i, o) {
                "string" == typeof t && (t = [ [ null, t, "" ] ]);
                var n = {};
                if (o) for (var s = 0; s < this.length; s++) {
                    var a = this[s][0];
                    null != a && (n[a] = !0);
                }
                for (var r = 0; r < t.length; r++) {
                    var l = [].concat(t[r]);
                    o && n[l[0]] || (i && (l[2] ? l[2] = "".concat(i, " and ").concat(l[2]) : l[2] = i), 
                    e.push(l));
                }
            }, e;
        };
    }, function(t, e, i) {
        "use strict";
        var o = this && this.__assign || function() {
            return (o = Object.assign || function(t) {
                for (var e, i = 1, o = arguments.length; i < o; i++) for (var n in e = arguments[i]) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t;
            }).apply(this, arguments);
        }, n = this && this.__createBinding || (Object.create ? function(t, e, i, o) {
            void 0 === o && (o = i), Object.defineProperty(t, o, {
                enumerable: !0,
                get: function() {
                    return e[i];
                }
            });
        } : function(t, e, i, o) {
            void 0 === o && (o = i), t[o] = e[i];
        }), s = this && this.__setModuleDefault || (Object.create ? function(t, e) {
            Object.defineProperty(t, "default", {
                enumerable: !0,
                value: e
            });
        } : function(t, e) {
            t.default = e;
        }), a = this && this.__importStar || function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t) for (var i in t) "default" !== i && Object.hasOwnProperty.call(t, i) && n(e, t, i);
            return s(e, t), e;
        };
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = i(0), l = i(3), d = a(i(1)), c = i(2);
        l.Litepicker.prototype.show = function(t) {
            void 0 === t && (t = null);
            var e = t || this.options.element;
            if (this.triggerElement = e, this.options.inlineMode) return this.picker.style.position = "static", 
            this.picker.style.display = "inline-block", this.picker.style.top = null, this.picker.style.left = null, 
            this.picker.style.bottom = null, void (this.picker.style.right = null);
            if (this.options.scrollToDate) if (!this.options.startDate || t && t !== this.options.element) {
                if (t && this.options.endDate && t === this.options.elementEnd) {
                    var i = this.options.endDate.clone();
                    i.setDate(1), this.options.numberOfMonths > 1 && i.setMonth(i.getMonth() - (this.options.numberOfMonths - 1)), 
                    this.calendars[0] = i.clone();
                }
            } else {
                var o = this.options.startDate.clone();
                o.setDate(1), this.calendars[0] = o.clone();
            }
            if (this.options.mobileFriendly && c.isMobile()) {
                this.picker.style.position = "fixed", this.picker.style.display = "block", "portrait" === c.getOrientation() ? (this.options.numberOfMonths = 1, 
                this.options.numberOfColumns = 1) : (this.options.numberOfMonths = 2, this.options.numberOfColumns = 2), 
                this.render();
                var n = this.picker.getBoundingClientRect();
                return this.picker.style.top = "calc(50% - " + n.height / 2 + "px)", this.picker.style.left = "calc(50% - " + n.width / 2 + "px)", 
                this.picker.style.right = null, this.picker.style.bottom = null, this.picker.style.zIndex = this.options.zIndex, 
                this.backdrop.style.display = "block", this.backdrop.style.zIndex = this.options.zIndex - 1, 
                document.body.classList.add(d.litepickerOpen), "function" == typeof this.options.onShow && this.options.onShow.call(this), 
                void (t ? t.blur() : this.options.element.blur());
            }
            this.render(), this.picker.style.position = "absolute", this.picker.style.display = "block", 
            this.picker.style.zIndex = this.options.zIndex;
            var s = e.getBoundingClientRect(), a = this.picker.getBoundingClientRect(), r = s.bottom, l = s.left, p = 0, h = 0, u = 0, m = 0;
            if (this.options.parentEl) {
                var f = this.picker.parentNode.getBoundingClientRect();
                r -= f.bottom, (r += s.height) + a.height > window.innerHeight && s.top - f.top - s.height > 0 && (u = s.top - f.top - s.height), 
                (l -= f.left) + a.width > window.innerWidth && s.right - f.right - a.width > 0 && (m = s.right - f.right - a.width);
            } else p = window.scrollX || window.pageXOffset, h = window.scrollY || window.pageYOffset, 
            r + a.height > window.innerHeight && s.top - a.height > 0 && (u = s.top - a.height), 
            l + a.width > window.innerWidth && s.right - a.width > 0 && (m = s.right - a.width);
            this.picker.style.top = (u || r) + h + "px", this.picker.style.left = (m || l) + p + "px", 
            this.picker.style.right = null, this.picker.style.bottom = null, "function" == typeof this.options.onShow && this.options.onShow.call(this);
        }, l.Litepicker.prototype.hide = function() {
            this.isShowning() && (this.datePicked.length = 0, this.updateInput(), this.options.inlineMode ? this.render() : (this.picker.style.display = "none", 
            "function" == typeof this.options.onHide && this.options.onHide.call(this), this.options.mobileFriendly && (document.body.classList.remove(d.litepickerOpen), 
            this.backdrop.style.display = "none")));
        }, l.Litepicker.prototype.getDate = function() {
            return this.getStartDate();
        }, l.Litepicker.prototype.getStartDate = function() {
            return this.options.startDate ? this.options.startDate.clone().getDateInstance() : null;
        }, l.Litepicker.prototype.getEndDate = function() {
            return this.options.endDate ? this.options.endDate.clone().getDateInstance() : null;
        }, l.Litepicker.prototype.setDate = function(t) {
            this.setStartDate(t), "function" == typeof this.options.onSelect && this.options.onSelect.call(this, this.getDate());
        }, l.Litepicker.prototype.setStartDate = function(t) {
            t && (this.options.startDate = new r.DateTime(t, this.options.format, this.options.lang), 
            this.updateInput());
        }, l.Litepicker.prototype.setEndDate = function(t) {
            t && (this.options.endDate = new r.DateTime(t, this.options.format, this.options.lang), 
            this.options.startDate.getTime() > this.options.endDate.getTime() && (this.options.endDate = this.options.startDate.clone(), 
            this.options.startDate = new r.DateTime(t, this.options.format, this.options.lang)), 
            this.updateInput());
        }, l.Litepicker.prototype.setDateRange = function(t, e) {
            this.triggerElement = void 0, this.setStartDate(t), this.setEndDate(e), this.updateInput(), 
            "function" == typeof this.options.onSelect && this.options.onSelect.call(this, this.getStartDate(), this.getEndDate());
        }, l.Litepicker.prototype.gotoDate = function(t, e) {
            void 0 === e && (e = 0);
            var i = new r.DateTime(t);
            i.setDate(1), this.calendars[e] = i.clone(), this.render();
        }, l.Litepicker.prototype.setLockDays = function(t) {
            this.options.lockDays = r.DateTime.convertArray(t, this.options.lockDaysFormat), 
            this.render();
        }, l.Litepicker.prototype.setHolidays = function(t) {
            this.options.holidays = r.DateTime.convertArray(t, this.options.holidaysFormat), 
            this.render();
        }, l.Litepicker.prototype.setPartiallyBookedDays = function(t) {
            this.options.partiallyBookedDays = r.DateTime.convertArray(t, this.options.partiallyBookedDaysFormat), 
            this.render();
        }, l.Litepicker.prototype.setBookedDays = function(t) {
            this.options.bookedDays = r.DateTime.convertArray(t, this.options.bookedDaysFormat), 
            this.render();
        }, l.Litepicker.prototype.setHighlightedDays = function(t) {
            this.options.highlightedDays = r.DateTime.convertArray(t, this.options.highlightedDaysFormat), 
            this.render();
        }, l.Litepicker.prototype.setOptions = function(t) {
            delete t.element, delete t.elementEnd, delete t.parentEl, t.startDate && (t.startDate = new r.DateTime(t.startDate, this.options.format, this.options.lang)), 
            t.endDate && (t.endDate = new r.DateTime(t.endDate, this.options.format, this.options.lang));
            var e = o(o({}, this.options.dropdowns), t.dropdowns), i = o(o({}, this.options.buttonText), t.buttonText), n = o(o({}, this.options.tooltipText), t.tooltipText);
            this.options = o(o({}, this.options), t), this.options.dropdowns = o({}, e), this.options.buttonText = o({}, i), 
            this.options.tooltipText = o({}, n), !this.options.singleMode || this.options.startDate instanceof r.DateTime || (this.options.startDate = null, 
            this.options.endDate = null), this.options.singleMode || this.options.startDate instanceof r.DateTime && this.options.endDate instanceof r.DateTime || (this.options.startDate = null, 
            this.options.endDate = null);
            for (var s = 0; s < this.options.numberOfMonths; s += 1) {
                var a = this.options.startDate ? this.options.startDate.clone() : new r.DateTime();
                a.setDate(1), a.setMonth(a.getMonth() + s), this.calendars[s] = a;
            }
            this.options.lockDays.length && (this.options.lockDays = r.DateTime.convertArray(this.options.lockDays, this.options.lockDaysFormat)), 
            this.options.holidays.length && (this.options.holidays = r.DateTime.convertArray(this.options.holidays, this.options.holidaysFormat)), 
            this.options.partiallyBookedDays.length && (this.options.partiallyBookedDays = r.DateTime.convertArray(this.options.partiallyBookedDays, this.options.partiallyBookedDaysFormat)), 
            this.options.bookedDays.length && (this.options.bookedDays = r.DateTime.convertArray(this.options.bookedDays, this.options.bookedDaysFormat)), 
            this.options.highlightedDays.length && (this.options.highlightedDays = r.DateTime.convertArray(this.options.highlightedDays, this.options.highlightedDaysFormat)), 
            this.render(), this.options.inlineMode && this.show(), this.updateInput();
        }, l.Litepicker.prototype.clearSelection = function() {
            this.options.startDate = null, this.options.endDate = null, this.datePicked.length = 0, 
            this.updateInput(), this.isShowning() && this.render();
        }, l.Litepicker.prototype.destroy = function() {
            this.picker && this.picker.parentNode && (this.picker.parentNode.removeChild(this.picker), 
            this.picker = null), this.backdrop && this.backdrop.parentNode && this.backdrop.parentNode.removeChild(this.backdrop);
        };
    }, function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
    } ]).Litepicker;
}), document.addEventListener("DOMContentLoaded", function(event) {
    const fadeOutCalendar = () => {
        $("#litepicker .litepicker .container__days").css("visibility", "hidden");
    }, initSelectHandler = () => {
        const bookingForm = $("#booking-form"), startSelect = bookingForm.find("select[name=repetition-start]"), endSelect = bookingForm.find("select[name=repetition-end]");
        startSelect.change(function() {
            const startValue = $(this).val();
            endSelect.find("option").each(function() {
                $(this).val() < startValue ? ($(this).attr("disabled", "disabled"), $(this).prop("selected", !1)) : $(this).removeAttr("disabled");
            });
        });
    }, updateSelectSlots = (select, slots, type = "start", fullday = !1) => {
        select.empty().attr("required", "required"), $.each(slots, function(index, slot) {
            select.append(new Option(slot.timestart + " - " + slot.timeend, slot["timestamp" + type], fullday, fullday));
        });
    }, getOrientation = () => window.matchMedia("(orientation: portrait)").matches ? "portrait" : "landscape", initStartSelect = date => {
        const day1 = data.days[moment(date).format("YYYY-MM-DD")], startDate = moment(date).format("DD.MM.YYYY");
        $("#booking-form select[name=repetition-end], #booking-form .time-selection.repetition-end .date").hide();
        let startSelect = $("#booking-form select[name=repetition-start]");
        $(".time-selection.repetition-start span.date").text(startDate), updateSelectSlots(startSelect, day1.slots, "start", day1.fullDay), 
        day1.fullDay ? $(".time-selection.repetition-start").find("label, select").hide() : $(".time-selection.repetition-start").find("label, select").show();
    }, initEndSelect = date => {
        const day2 = data.days[moment(date).format("YYYY-MM-DD")], endDate = moment(date).format("DD.MM.YYYY");
        let endSelect = $("#booking-form select[name=repetition-end]");
        $(".time-selection.repetition-end span.date").text(endDate), updateSelectSlots(endSelect, day2.slots, "end", day2.fullDay), 
        day2.fullDay ? $(".time-selection.repetition-end").find("label, select").hide() : $(".time-selection.repetition-end").find("label, select").show(), 
        $("#booking-form select[name=repetition-end], #booking-form .time-selection.repetition-end .date").show();
    };
    let numberOfMonths = 2, numberOfColumns = 2;
    if ((() => {
        const isPortrait = "portrait" === getOrientation();
        return window.matchMedia(`(max-device-${isPortrait ? "width" : "height"}: 480px)`).matches;
    })()) switch (screen.orientation.angle) {
      case -90:
      case 90:
        numberOfMonths = 2, numberOfColumns = 2;
        break;

      default:
        numberOfMonths = 1, numberOfColumns = 1;
    }
    let picker = new Litepicker({
        element: document.getElementById("litepicker"),
        minDate: moment().format("YYYY-MM-DD"),
        inlineMode: !0,
        firstDay: 1,
        lang: "de-DE",
        numberOfMonths: numberOfMonths,
        numberOfColumns: numberOfColumns,
        moveByOneMonth: !0,
        singleMode: !1,
        showWeekNumbers: !1,
        autoApply: !0,
        bookedDaysInclusivity: "[]",
        anyBookedDaysAsCheckout: !1,
        disallowBookedDaysInRange: !0,
        disallowPartiallyBookedDaysInRange: !0,
        disallowLockDaysInRange: !0,
        mobileFriendly: !0,
        selectForward: !0,
        useResetBtn: !0,
        maxDays: 3,
        buttonText: {
            apply: "Buchen",
            cancel: "Abbrechen"
        },
        onAutoApply: datePicked => {
            datePicked && ($("#booking-form").show(), $(".cb-notice.date-select").hide());
        },
        resetBtnCallback: () => {
            $("#booking-form").hide(), $(".cb-notice.date-select").show();
        },
        onChangeMonth: function(date, idx) {
            fadeOutCalendar();
            const startDate = moment(date.format("YYYY-MM-DD")).format("YYYY-MM-DD"), calStartDate = moment(date.format("YYYY-MM-DD")).date(0).format("YYYY-MM-DD"), calEndDate = moment(date.format("YYYY-MM-DD")).add(numberOfMonths, "months").date(1).format("YYYY-MM-DD");
            $.post(cb_ajax.ajax_url, {
                _ajax_nonce: cb_ajax.nonce,
                action: "calendar_data",
                item: $("#booking-form input[name=item-id]").val(),
                location: $("#booking-form input[name=location-id]").val(),
                sd: calStartDate,
                ed: calEndDate
            }, function(data) {
                updatePicker(data), picker.gotoDate(startDate);
            });
        }
    });
    $("#litepicker .litepicker").hide();
    const updatePicker = data => {
        fadeOutCalendar(), picker.setOptions({
            minDate: moment().isAfter(data.startDate) ? moment().format("YYYY-MM-DD") : data.startDate,
            maxDate: data.endDate,
            days: data.days,
            maxDays: data.maxDays,
            lockDays: data.lockDays,
            bookedDays: data.bookedDays,
            partiallyBookedDays: data.partiallyBookedDays,
            highlightedDays: data.highlightedDays,
            holidays: data.holidays,
            onDayHover: function(date, attributes) {
                if ($.inArray("is-start-date", attributes) > -1 || $.inArray("is-end-date", attributes) > -1) {
                    console.log(date), $("#booking-form").show(), $(".cb-notice.date-select").hide(), 
                    $.inArray("is-start-date", attributes) > -1 ? initStartSelect(date) : $.inArray("is-end-date", attributes) > -1 && initEndSelect(date);
                }
            },
            onSelect: function(date1, date2) {
                $("#booking-form").show(), $(".cb-notice.date-select").hide();
                const day1 = data.days[moment(date1).format("YYYY-MM-DD")], day2 = data.days[moment(date2).format("YYYY-MM-DD")];
                initStartSelect(date1), initEndSelect(date2), day1.fullDay && day2.fullDay ? $("#fullDayInfo").text(data.location.fullDayInfo) : ($("#fullDayInfo").text(""), 
                initSelectHandler());
            }
        }), $("#litepicker .litepicker .container__days").fadeTo("fast", 1);
    };
    if ($("#booking-form").length) {
        const startDate = moment().format("YYYY-MM-DD"), calStartDate = moment().date(1).format("YYYY-MM-DD"), calEndDate = moment().add(numberOfMonths + 2, "months").date(0).format("YYYY-MM-DD");
        "undefined" != typeof data && updatePicker(data), $.post(cb_ajax.ajax_url, {
            _ajax_nonce: cb_ajax.nonce,
            action: "calendar_data",
            item: $("#booking-form input[name=item-id]").val(),
            location: $("#booking-form input[name=location-id]").val(),
            sd: calStartDate,
            ed: calEndDate
        }, function(data) {
            updatePicker(data), picker.gotoDate(startDate);
        });
    }
});