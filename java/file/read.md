> resouce目录下
```java
    public static JSONObject getDefaultPlan() {
        try {
            File file = ResourceUtils.getFile("classpath:json/defaultTheme.json");
            String jsonFile = new String(FileUtil.readBytes(file.getPath()));
            JSONObject obj = JSONUtil.parseObj(jsonFile);
            return obj.getJSONObject("layerInformation");
        } catch (FileNotFoundException e) {
            log.warn(e.toString());
        }
        return null;
    }
```

> 绝对目录
```java
    private static String readFile(String filePath) throws FileNotFoundException {
        File file = ResourceUtils.getFile("classpath:json/defaultTheme.json");;
        String jsonString = new String(FileUtil.readBytes(file.getPath()));
        return jsonString;
    }
```