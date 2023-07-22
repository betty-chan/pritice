// 入口
void main() {
    gl_Position = projectMatrix * modelMatrix * vec4(position, 1.0);
}

// 函数
float hash(float n) {
    return n * 43758.5453;
}