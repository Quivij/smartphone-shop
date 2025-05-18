const path = require("path");
const { spawn } = require("child_process");

exports.classifyIntent = (message) => {
  return new Promise((resolve, reject) => {
    const scriptPath = "C:/smartphone-shop/chatbot-model/predict.py";

    console.log("Predict script path:", scriptPath); // In ra đường dẫn để kiểm tra

    const pyProcess = spawn("python", [scriptPath, message]);

    let result = "";
    let errorOutput = "";

    pyProcess.stdout.on("data", (data) => {
      result += data.toString();
      console.log("Python stdout:", data.toString()); // Kiểm tra kết quả trả về
    });

    pyProcess.stderr.on("data", (data) => {
      errorOutput += data.toString();
      console.error("Python stderr:", data.toString()); // Kiểm tra lỗi
    });

    pyProcess.on("close", (code) => {
      console.log("Python script exited with code:", code); // Kiểm tra mã thoát

      if (code !== 0) {
        console.error("❌ Python script error:", errorOutput);
        return reject(new Error("Intent classification failed"));
      }

      const intent = result.trim();
      console.log("Intent classified:", intent); // Kiểm tra intent đã phân loại
      resolve(intent);
    });
  });
};
