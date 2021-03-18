function exchange(a, b) {
    let tmp = a;
    a = b;
    b = tmp;
    return { a, b }
}
//插入排序
function InsertSort(a) {
    n = a.length;
    for (let i = 1; i < n; i++) {
        if (a[i] < a[i - 1]) {
            let j = i - 1;
            let x = a[i];
            a[i] = a[i - 1];
            while (x < a[j]) {
                a[j + 1] = a[j];
                j--;
            }
            a[j + 1] = x;
        }
    }
}
//冒泡排序
function bubbleSort(a) {
    n = a.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (a[j] > a[j + 1]) {
                let tmp = a[j];
                a[j] = a[j + 1];
                a[j + 1] = tmp;
            }
        }
    }
}
//快速排序
function quicksort() {

}