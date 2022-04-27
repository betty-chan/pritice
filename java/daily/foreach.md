> jsonArray遍历
```java
JSONArray dwgData = itemObj.getJSONArray("dwgData");
// 方式1:for
for(int i=0;i<dwgData.size();i++) {
    JSONObject dwgEntity=dwgData.getJSONObject(i);
}
```
> jsonObject遍历
```java
JSONObject dwgEntity=dwgData.getJSONObject(i);
Map<String, Object> map = new HashMap<>();
// 方式1: for-of
for (String key: dwgEntity.keySet()) {
    map.put(key, dwgEntity.get(key));
}
```
> Map遍历
```java
Map<String, Object> data = new HashMap<String, Object>();
// 方式1: foreach
data.forEach((k,v)->{
    this.setFieldValueByName(k, v);
});
// 方式2: for-of
for (Map.Entry<String,Integer> entry : data.entrySet()){
    System.out.println("key:"+entry.getKey()+";value:"+entry.getValue());
}
```
> list遍历
```java
List<String> arrayList = new ArrayList<>();
// 方式1: foreach
arrayList.forEach(item->System.out.println(item));
// 方式2: for-of
for (String item:arrayList){
    System.out.println(item);
}
```
> object遍历
