<template>
  <div class="page-heading">
    <div class="page-title">
      <div class="row">
        <div class="col-12 col-md-6 order-md-1 order-last">
          <h3>{{ $t("menu.date_calculation") }}</h3>
        </div>
      </div>
    </div>

    <section class="section">
      <div class="card">
        <div class="card-body">
          <form id="mainForm">
            <div class="row">
              <div class="col-12">
                <div class="col-sm row">
                  <span class="col-sm col-form-label">Start</span>
                  <div class="col-sm">
                    <input type="text" v-model="startDt" ref="startDt" class="form-control" />
                  </div>
                  <span class="col-sm col-form-label">{{ $t("elapsed.day") }}</span>
                  <div class="col-sm">
                    <input type="number" v-model="startCalcDay" class="form-control" value="0" min="0" />
                  </div>
                  <div class="col-sm col-form-label">
                    <div class="form-switch ps-0">
                      <span class="me-2">Prev</span>
                      <span><input class="form-check-input ms-0" v-model="startNextFlag" @change="dateCalc('start')" type="checkbox" style="cursor: pointer" /></span>
                      <span class="ms-2">Next</span>
                    </div>
                  </div>
                  <div class="col-sm col-form-label">
                    <input type="text" v-model="startResult" class="form-control" />
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-12">
                <div class="col-sm row">
                  <span class="col-sm col-form-label">End</span>
                  <div class="col-sm">
                    <input type="text" v-model="endDt" ref="endDt" class="form-control" />
                  </div>
                  <span class="col-sm col-form-label">{{ $t("elapsed.day") }}</span>
                  <div class="col-sm">
                    <input type="number" v-model="endCalcDay" class="form-control" value="0" min="0" />
                  </div>
                  <div class="col-sm col-form-label">
                    <div class="form-switch ps-0">
                      <span class="me-2">Prev</span>
                      <span><input class="form-check-input ms-0" v-model="endNextFlag" @change="dateCalc('end')" type="checkbox" style="cursor: pointer" /></span>
                      <span class="ms-2">Next</span>
                    </div>
                  </div>
                  <div class="col-sm col-form-label">
                    <input type="text" v-model="endResult" class="form-control" />
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-12 text-center">
                <div class="btn-example">
                  <button type="button" class="btn btn-primary btn-sm" @click="actionRun('check')">Check</button>
                </div>
              </div>
            </div>

            <div class="text-center mt-3">Result : {{ resultText }}</div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { calculateDateDifference } from "@/utils/common";
import { ref, watch } from "vue";
import DatetimePicker from "@daracl/datetimepicker";
import "@daracl/datetimepicker/style/daracl.datetimepicker.scss";
import { i18n } from "@/i18n";

export default {
  mounted() {
    this.startDt = DatetimePicker.format(new Date());
    new DatetimePicker(this.$refs.startDt, {
      initialDate: new Date(),
      mode: "date",
      onSelect: (dt, mode, e) => {
        this.startDt = dt;
        this.dateCalc("start");
      },
    });

    this.endDt = DatetimePicker.format(new Date());
    new DatetimePicker(this.$refs.endDt, {
      initialDate: new Date(),
      mode: "date",
      onSelect: (dt, mode, e) => {
        this.endDt = dt;
        this.dateCalc("start");
      },
    });
  },
  data() {
    const startCalcDay = ref(0);
    const startResult = ref("");

    watch(startCalcDay, (newValue, oldValue) => {
      this.dateCalc("start");
    });

    const endCalcDay = ref(0);
    const endResult = ref("");

    watch(endCalcDay, (newValue, oldValue) => {
      this.dateCalc("end");
    });

    return {
      startDt: "",
      startNextFlag: true,
      startCalcDay,
      startResult,

      endDt: "",
      endNextFlag: true,
      endCalcDay,
      endResult,
      resultText: "",
    };
  },
  methods: {
    dateCalc(type) {
      let dt;
      let calcDay;
      let nextFlag;
      if (type == "start") {
        dt = this.startDt;
        calcDay = this.startCalcDay;
        nextFlag = this.startNextFlag;
      } else {
        dt = this.endDt;
        calcDay = this.endCalcDay;
        nextFlag = this.endNextFlag;
      }

      if (dt) {
        const checkDate = DatetimePicker.parser(dt);

        checkDate.setDate(checkDate.getDate() + calcDay * (nextFlag ? +1 : -1));
        const calcResultDt = DatetimePicker.format(checkDate);
        if (type == "start") {
          this.startResult = calcResultDt;
        } else {
          this.endResult = calcResultDt;
        }

        //console.log(type, DatetimePicker.format(checkDate), calcDay, calcDay * (nextFlag ? +1 : -1), nextFlag);
      }
    },
    actionRun(type) {
      if (this.startDt && this.endDt) {
        const startDt = DatetimePicker.parser(this.startDt);
        const endDt = DatetimePicker.parser(this.endDt);

        if (startDt.getTime() > endDt.getTime()) {
          alert(i18n.global.t("start.end.dt.over"));
          return;
        }

        const difference = calculateDateDifference(startDt, endDt);

        this.resultText = `${difference.years} Year ${difference.months} Month ${difference.days} Day`;
      }
    },
  },
};
</script>
