根据数据type实例化
```java
static BaseEntity  getClass(Map<String, Object> data) {
    String ClassName = TypeToClassName.get(data.get("type"));
    Constructor<?> classEntity;
    try {
        Class[] paramtersList = { Map.class };
        classEntity =  Class.forName("com.dalezhuang.clouddesign.deepen.util.cadFile.entities." + ClassName).getConstructor(paramtersList);
        return (BaseEntity)classEntity.newInstance(data);
    } catch (NoSuchMethodException | InstantiationException | IllegalAccessException | InvocationTargetException | ClassNotFoundException e) {
        return null;
    }
}
```

深拷贝
```java
import com.google.common.collect.Lists;
import cn.hutool.json.JSONUtil;
import java.util.List;
import cn.hutool.core.util.ObjectUtil;

// 写法1
public class Utils {
    public static <T> List<T> deepCopy(List<T> src) {
        List<T> newData = Lists.newArrayList();
        for (T t: src) {
            String jsonObject = JSONUtil.toJsonStr(t);
            T obj = JSONUtil.toBean(jsonObject, src.class);
            newData.add(obj);
        }
        return newData;
    }

    public static <T> List<T> deepCopy(List<T> src) {
        String jsonObject = JSONUtil.toJsonStr(src);
        List<T> newData = (List<T>) JSONUtil.parseArray(jsonObject);
        return newData;
    }
}

// 写法2
ObjectUtil.clone();
```