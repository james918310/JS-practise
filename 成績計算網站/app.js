//開場動畫
// let hero = document.querySelector(".hero");
// // 選取具有 ".hero" 類別的元素並存入 hero 變數中

// let slider = document.querySelector(".slider");
// // 選取具有 ".slider" 類別的元素並存入 slider 變數中

// let animation = document.querySelector("section.animation-warpper");
// // 選取第一個 <section> 標籤並且有 "animation-warpper" 類別的元素並存入 animation 變數中

// const time_line = new TimelineMax();
// // 創建一個新的 TimelineMax 時間軸實例並存入 time_line 變數中
// // 因 TimelineMax 為外部資源所以需要將其導入在一個變數中

// // parameter1 控制的對象
// // parameter2 duration 動畫要動多久
// // parameter3 控制對象的原始狀態
// // parameter4 控制動畫結束後的狀態

// time_line
//   .fromTo(hero, 1, { height: "0%" }, { height: "100%", ease: Power2.easeInOut })
//   // 將 hero 元素的高度從 0% 變為 100%，並設置動畫時間為 1 秒，動畫效果為 Power2.easeInOut

//   .fromTo(
//     hero,
//     1.2,
//     { width: "80%" },
//     { width: "100%", ease: Power2.easeInOut }
//   )
//   // 將 hero 元素的寬度從 80% 變為 100%，並設置動畫時間為 1.2 秒，動畫效果為 Power2.easeInOut

//   .fromTo(
//     slider,
//     1,
//     { x: "-100%" },
//     { x: "0%", ease: Power2.easeInOut },
//     "-=1.2"
//   )
//   // 將 slider 元素的 x 坐標從 -100% 移動到 0%，並設置動畫時間為 1 秒，動畫效果為 Power2.easeInOut，且在前一動畫後延遲 1.2 秒執行

//   .fromTo(animation, 0.3, { opacity: 1 }, { opacity: 0 });
// // 將 animation 元素的透明度從 1 變為 0，並設置動畫時間為 0.3 秒

// setTimeout(() => {
//   animation.style.pointerEvents = "none";
//   // 在延遲 0 秒後將 animation 元素的 pointer-events 屬性設置為 "none"，使其無法觸發滑鼠事件
// });

//讓整個網站的enter key都無法使用
window.addEventListener("keypress", (e) => {
  if (e.key == "enter") {
    e.preventDefault();
  }
});

//防止form 內部的button交出表單
let allbuttons = document.querySelectorAll("button");
console.log(allbuttons);
//找出所有的button存在allbuttons
allbuttons.forEach((button) => {
  //將抓到的button一個一個抓進涵式中
  button.addEventListener("click", (e) => {
    //事件間聽器在做監聽看有無buttton被做click，有的話就做取消預設事件
    e.preventDefault();
  });
});

//當選擇分數時會改變顏色

let allselects = document.querySelectorAll("select");
console.log(allselects);
allselects.forEach((select) => {
  select.addEventListener("change", (e) => {
    changeColor(e.target);
    setGPA();
  });
});

// 改變credit之後，GPA也要更新
let credits = document.querySelectorAll(".class-credits");
credits.forEach((credit) => {
  credit.addEventListener("change", () => {
    setGPA();
  });
});

function changeColor(target) {
  if (target.value == "A" || target.value == "A-") {
    target.style.backgroundColor = "lightgreen";
    target.style.color = "black";
  } else if (
    target.value == "B" ||
    target.value == "B-" ||
    target.value == "B+"
  ) {
    target.style.backgroundColor = "yellow";
    target.style.color = "black";
  } else if (
    target.value == "C" ||
    target.value == "C-" ||
    target.value == "C+"
  ) {
    target.style.backgroundColor = "orange";
    target.style.color = "black";
  } else if (
    target.value == "D" ||
    target.value == "D-" ||
    target.value == "D+"
  ) {
    target.style.backgroundColor = "red";
    target.style.color = "black";
  } else if (target.value == "F") {
    target.style.backgroundColor = "grey";
    target.style.color = "white";
  } else {
    target.style.backgroundColor = "white";
  }
}

function convertor(grade) {
  switch (grade) {
    case "A":
      return 4.0;
    case "A-":
      return 3.7;
    case "B+":
      return 3.4;
    case "B":
      return 3.0;
    case "B-":
      return 2.7;
    case "C+":
      return 2.4;
    case "C":
      return 2.0;
    case "C-":
      return 1.7;
    case "D+":
      return 1.4;
    case "D":
      return 1.0;
    case "D-":
      return 0.7;
    case "F":
      return 0.0;
    default:
      return 0;
  }
}

function setGPA() {
  let formLength = document.querySelectorAll("form").length;
  let credits = document.querySelectorAll(".class-credits");
  let selects = document.querySelectorAll("select");
  let sum = 0; // GPA計算用分子
  let creditSum = 0; // GPA計算用分母

  for (let i = 0; i < credits.length; i++) {
    if (!isNaN(credits[i].valueAsNumber)) {
      creditSum += credits[i].valueAsNumber;
    }
  }

  for (let i = 0; i < formLength; i++) {
    if (!isNaN(credits[i].valueAsNumber)) {
      sum += credits[i].valueAsNumber * convertor(selects[i].value);
    }
  }

  let result;
  if (creditSum == 0) {
    result = (0.0).toFixed(2);
  } else {
    result = (sum / creditSum).toFixed(2);
  }
  document.getElementById("result-gpa").innerText = result;
}
