"use client";
import {
  Button,
  Card,
  Checkbox,
  Textarea,
  ToastToggle,
  ToggleSwitch,
} from "flowbite-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import increase from "../../public/increase.png";
import decrease from "../../public/decrease.png";

export default function TopDownAnalysis() {
  const [fund, setFund] = useState(true);
  const [weekly, setWeekly] = useState({
    trend: true,
    ote: true,
  });

  const [daily, setDaily] = useState({
    trend: true,
    ote: true,
    smt: true,
    les: true,
    text: "",
  });

  const [hourly, setHourly] = useState({
    trend: true,
    range: true,
    ote: true,
    smt: true,
    les: true,
    text: "",
  });

  const dailyTrend = daily?.trend;
  const dailySmtOrLesPattern = daily?.les || daily?.smt;
  const dailyOTE = daily?.ote;

  const hourlyTrend = hourly?.trend;
  const hourlySmtOrLesPattern = hourly?.les || hourly?.smt;
  const hourlyOTE = hourly?.ote;
  const hourlyTradingRange = hourly?.range;

  useEffect(() => {
    const analysis = JSON.parse(localStorage.getItem("analysis") as string);
    setFund(() => analysis?.fund);
    setWeekly(() => analysis?.weekly);
    setDaily(() => analysis?.daily);
    setHourly(() => analysis?.hourly);
  }, []);

  function handleWeekly(value: boolean, key: string) {
    setWeekly((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }

  function handleDaily(value: boolean | string, key: string) {
    setDaily((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }

  function handleHourly(value: boolean | string, key: string) {
    setHourly((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }

  function saveAnalysis() {
    localStorage.setItem(
      "analysis",
      JSON.stringify({
        fund,
        weekly,
        daily,
        hourly,
      })
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div>
        <div className="flex flex-col gap-2">
          <Card className="py-2 ">
            <h3 className="border-b-gray-200 border-b-2 font-black text-gray-600">
              Fundamental
            </h3>
            <div className="flex">
              <div className="flex-1/2">
                <ToggleSwitch
                  checked={fund}
                  onChange={() => setFund(!fund)}
                  label={fund ? "up" : "down"}
                />
              </div>
            </div>
          </Card>
          <Card className="py-2 ">
            <h3 className="border-b-gray-200 border-b-2 font-black text-gray-600">
              Weekly
            </h3>
            <div className="flex">
              <div className="flex-1/2">
                <ToggleSwitch
                  checked={weekly?.trend}
                  onChange={(value) => handleWeekly(value, "trend")}
                  label={weekly?.trend ? "up" : "down"}
                />
              </div>
              <div className="flex-1/2">
                <ToggleSwitch
                  checked={weekly?.ote}
                  onChange={(value) => handleWeekly(value, "ote")}
                  label={weekly?.ote ? "OB" : "OS"}
                />
              </div>
            </div>
          </Card>
          <Card className="py-2">
            <h3 className="border-b-gray-200 border-b-2 font-black text-gray-600">
              Daily
            </h3>
            <div className="flex ">
              <div className="flex-1/2">
                <ToggleSwitch
                  checked={daily?.trend}
                  onChange={(value) => handleDaily(value, "trend")}
                  label={daily?.trend ? "up" : "down"}
                />
              </div>
              <div className="flex-1/2">
                <ToggleSwitch
                  checked={daily?.ote}
                  onChange={(value) => handleDaily(value, "ote")}
                  label={daily?.ote ? "OB" : "OS"}
                />
              </div>
            </div>
            <div className="flex ">
              <div className="flex-1/2">
                <ToggleSwitch
                  checked={daily?.smt}
                  onChange={(value) => handleDaily(value, "smt")}
                  label={daily?.smt ? "SMT-Y" : "SMT-N"}
                />
              </div>
              <div className="flex-1/2">
                <ToggleSwitch
                  checked={daily?.les}
                  onChange={(value) => handleDaily(value, "les")}
                  label={daily?.les ? "LES-Y" : "LES-N"}
                />
              </div>
            </div>
          </Card>
          <Card className="py-2">
            <h3 className="border-b-gray-200 border-b-2 font-black text-gray-600">
              Hourly
            </h3>
            <div className="flex">
              <div className="flex flex-1/2 items-center">
                <ToggleSwitch
                  className="flex-2/3"
                  checked={hourly?.trend}
                  onChange={(value) => handleHourly(value, "trend")}
                  label={hourly?.range ? "RNG" : hourly?.trend ? "up" : "down"}
                  disabled={hourly?.range}
                  color={hourly?.range ? "gray" : "blue"}
                />
                <div className="flex-1/3 items-center flex">
                  <Checkbox
                    checked={hourly?.range}
                    onChange={() => handleHourly(!hourly?.range, "range")}
                  />
                </div>
              </div>
              <div className="flex-1/2">
                <ToggleSwitch
                  checked={hourly?.ote}
                  onChange={(value) => handleHourly(value, "ote")}
                  label={hourly?.ote ? "OB" : "OS"}
                />
              </div>
            </div>
            <div className="flex ">
              <div className="flex-1/2">
                <ToggleSwitch
                  checked={hourly?.smt}
                  onChange={(value) => handleHourly(value, "smt")}
                  label={hourly?.smt ? "SMT-Y" : "SMT-N"}
                />
              </div>
              <div className="flex-1/2">
                <ToggleSwitch
                  checked={hourly?.les}
                  onChange={(value) => handleHourly(value, "les")}
                  label={hourly?.les ? "LES-Y" : "LES-N"}
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-10">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table
              dir="rtl"
              className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
            >
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    وضعیت
                  </th>
                  <th scope="col" className="px-6 py-3">
                    هفتگی
                  </th>
                  <th scope="col" className="px-6 py-3">
                    روزانه
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ساعتی
                  </th>
                  <th scope="col" className="px-6 py-3">
                    فاندامنتال
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    بررسی روند ها
                  </th>
                  <td className="px-6 py-4">
                    <Image
                      src={weekly?.trend ? increase : decrease}
                      alt="trend"
                      width={25}
                      height={25}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <Image
                      src={dailyTrend ? increase : decrease}
                      alt="trend"
                      width={25}
                      height={25}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <Image
                      src={
                        hourlyTrend
                          ? increase
                          : hourly?.trend
                            ? increase
                            : decrease
                      }
                      alt="trend"
                      width={25}
                      height={25}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <Image
                      src={fund ? increase : decrease}
                      alt="trend"
                      width={25}
                      height={25}
                    />
                  </td>
                </tr>

                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    بررسی چارت روزانه
                  </th>
                  <td className="px-6 py-4" colSpan={4}>
                    {`
                      ${fund ? "فاندامنتال صعودی" : "فاندامنتال نزولی"}
                      و 
                      ${dailyTrend ? "چارت روزانه صعودی " : " چارت روزانه نزولی "}
                       و
                      ${dailyOTE ? "قیمت در پریمیوم می‌باشد" : "قیمت در دیسکانت می‌باشد"}
                       و 
                      ${dailySmtOrLesPattern ? "ساختار جمع آوری نقدینگی یا smt مشاهده شد." : ""}
                      ${""}
                      ${""}

                    `}
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    بررسی چارت ساعتی
                  </th>
                  <td className="px-6 py-4" colSpan={4}>
                    {`
                      ${fund ? "فاندامنتال صعودی" : "فاندامنتال نزولی"}
                      و 
                      ${hourlyTradingRange ? "قیمت در ساعتی رنج است" : hourlyTrend ? "چارت ساعتی صعودی " : " چارت ساعتی نزولی "}
                       و
                      ${hourlyOTE ? "قیمت در پریمیوم می‌باشد" : "قیمت در دیسکانت می‌باشد"}
                       
                      ${hourlySmtOrLesPattern ? "و ساختار جمع آوری نقدینگی یا smt مشاهده شد. " : ""}
                      ${""}
                      ${""}

                    `}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 my-5">
        <Button className="cursor-pointer " onClick={saveAnalysis}>
          Save
        </Button>
      </div>
      <Card dir="rtl" className="font-medium text-xl flex flex-col gap-3">
        <h2 className="font-black text-3xl">توضیحات استراتژی ترید: </h2>
        <h3 className="font-bold text-xl my-5">تایم 15 و 5 دقیقه</h3>
        <p>CBDR و ASIA مشخص شود</p>
        <ul className="pr-5">
          <ol>1. 50 درصد ناحیه ASIA و CBDR را علامت بزنید.</ol>
          <ol>2. سقف و کف آسیا را علامت بزنید.</ol>
          <ol>3. سقف و کف روز قبل را علامت بزنید</ol>
        </ul>
        <h3 className="font-bold text-xl my-5">
          اگر شروع حرکت قیمت در خلاف فاند روز شروع شد:
        </h3>
        <p>
          منتظر حرکت فیک باش تا ساعت 2 الی 3 صبح به وقت نیویورک (در ابتدای روز
          انتظار داریم یک حرکت خلاف جهت خلاف فاند روز انجام شود برای رسیدن به یک
          ناحیه مهم تایم یا استخر نقدینگی تایم یک ساعته)
        </p>

        <p>
          اگر قیمت یکی از سه مورد بالا را در فاز دستکاری قیمت هانت کرد یا به
          ناحیه مهمی درتایم یک ساعته رسید (این رسیدن هرچه به ساعت 2 نزدیکتر باشد
          معامله اطمینان بیشتری دارد):
        </p>

        <p>
          ساختار قیمت رو بررسی کن اگر ساختار جمع آوری دیدی وارد تایم یک دقیقه و
          منتظر شکست در جهت فاند باش در غیر این صورت در تایم 5 یا 15 دقیقه منتظر
          شکست در جهت فاند باش.
        </p>

        <p>
          اگر قیمت همچنان در لندن هم خلاف فاند حرکت کرد ساعت 5 الی 7 تایم ریکسی
          برای معامله هست، تنها باید به یک ناحیه مهم تایم یک ساعته رسیده باشد تا
          اجازه داشته باشید در 5 دقیقه دنبال تریگر باشید.
        </p>

        <p>
          اگر قیمت در تایم 5 الی 7 هم خلاف فاند حرکت کرد، ساعت 7 الی 8.5 نهایت 9
          منتظر رسیدن به یک ناحیه تایم بالا یا هانت یک ناحیه باش سپس در 5 یا 15
          دقیقه ببین آیا ساختار جمع آوری داری، اگه بود وارد تایم 1 دقیقه برای
          ستاپ برو در غیر این صورت منتظر شکست در جهت فاند در همون تایم 5 الی 15
          باش.
        </p>
        <h3 className="font-bold text-xl my-5">
          اگر شروع حرکت قیمت در جهت فاند روز شروع شد:
        </h3>
        <h4 className=" text-xl ">حالت اول:</h4>
        <p>
          قیمت را ساعت 2 بررسی کن اگر ناحیه‌ای را در جهت فاند هانت کرد احتمالاً
          بین ساعت 2 تا 3 یک حرکت خلاف جهت فاند رخ خواهد داد که به ناحیه 50 درصد
          CBDR + ASIA می‌رسد یا با سرعت به سمت سقف ASIA یا سقف روز قبل حرکت
          می‌کند و از ساعت 3 در جهت فاند حرکت خواهد کرد. اگر قیمت در جهت فاند
          حرکت کرد با توجه به TDA و رنج هفتگی و موقعیت معاملاتی تصمیم به ادامه
          یا خروج در TP2 بگیرید.
        </p>

        <p>
          اگر قیمت در این نواحی بازگشت نکرد، ساعت 5 الی 7 به شدت ریسکی است و شما
          احتمالاً با رنجی مواجه می‌شوید که ممکن است تریگر فیلد بدهد، اما اگر در
          تایم یک ساعته به ناحیه مهمی رسیده بود می‌توانید با توجه به ستاپ وارد
          شوید. اگر قیمت در جهت فاند حرکت کرد، با توجه به TDA و رنج هفتگی و
          موقعیت معاملاتی تصمیم به ادامه یا خروج در TP2 بگیرید.
        </p>

        <p>
          ساعت 7 الی 8.5 نهایت 9 منتظر رسیدن به یک ناحیه تایم بالا یا هانت یک
          ناحیه باش، سپس در تایم 5 یا 15 دقیقه ببین آیا ساختار جمع‌آوری داری.
          اگر بود وارد تایم 1 دقیقه برای ستاپ شو، در غیر این صورت منتظر شکست در
          جهت فاند در همان تایم 5 الی 15 دقیقه باش.
        </p>

        <h4 className="text-xl mt-6">حالت دوم:</h4>
        <p>
          در این صورت قیمت در تایم لندن هم همانند ساعت 0 تا 3 در یک جهت حرکت
          می‌کند. بدون تریگر در تایم 5 تا 7 منتظر یک برگشت به یک ناحیه مهم تایم
          یک ساعته باش، ولی تریگری انجام نده. در تایم نیویورک اگر به ناحیه مهمی
          رسید یا یک استخر نقدینگی هانت شد، می‌تونی در تایم 5 یا 15 دقیقه منتظر
          شکست در ادامه حرکت در جهت فاند باشی. اگر ساختار جمع‌آوری دیدی وارد
          تایم 1 دقیقه شو.
        </p>
        <p className="text-center font-extrabold text-red-600 text-2xl">
          تمامی معاملات ساعت 10 به وقت نیویورک باید بسته شود.
        </p>
      </Card>
    </div>
  );
}
