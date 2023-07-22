
/**
 * @param {*} blob 文件blob
 * @param {*} callback 回调函数
 */
export function getBase64(data) {
  return new Promise((resolve, reject) => {
    const blob = new Blob([data], { type: "image/png" }); // 必须指定type类型
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
