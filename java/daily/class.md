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

// 写法1
public class Utils {
    public static <T> List<T> deepCopy(List<T> src, Class<T> entityClass) {
        List<T> newList = Lists.newArrayList();
        for (T t: src) {
            String jsonObject = JSONUtil.toJsonStr(t);
            T obj = JSONUtil.toBean(jsonObject, entityClass);
            newList.add(obj);
        }
        return newList;
    }
}
// 写法2
public class Utils {
    public static <T> List<T> deepCopy(List<T> src) {
        String jsonObject = JSONUtil.toJsonStr(src);
        List<T> newList = (List<T>) JSONUtil.parseArray(jsonObject);
        return newList;
    }
}
```