定义枚举
```java
@Getter
@AllArgsConstructor
public enum EstimateType implements BaseEnum{
    overall(1, "总体", "EstimateOverall"),
    convexWindow(2, "凸窗", "EstimateConvexWindow"),
    ;
    @ApiModelProperty(value = "value")
    private int key;
    @ApiModelProperty(value = "描述")
    private String desc;
    @ApiModelProperty(value = "类名")
    private String className;

import cn.hutool.core.util.ReflectUtil;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.Optional;

@Getter
@AllArgsConstructor
public enum DrawingSheetType {
    SlabDetail("1-56", "叠合板详图", "deepenSheetService"),
    SlabLayout("2-56", "叠合板布置图", "slabLayoutSheetService")
    ;
    private String type;
    private String dec;
    private String serviceName;

    public static<T> EstimateType getItem(String property, T value){
        Optional<DrawingSheetType> any = Stream.of(values())
                .filter(e -> {
                    Field field = ReflectUtil.getField(e.getClass(), property);
                    T obj = (T)ReflectUtil.getFieldValue(e, field);
                    return obj.equals(value);
                })
                .findAny();
        if (any.isPresent()){
            return any.get();
        }
        return null;
    }

    public static EstimateType getItemByKey(Integer key){
        Optional<EstimateType> any = Arrays.stream(EstimateType.class.getEnumConstants())
                .filter(e -> e.getKey() == key)
                .findAny();
        if (any.isPresent()){
            return any.get();
        }
        return null;
    }

    public static EstimateType getItemByDesc(String desc){
        Optional<EstimateType> any = Stream.of(values())
                .filter(e -> e.getDesc().equals(desc))
                .findAny();
        if (any.isPresent()){
            return any.get();
        }
        return null;
    }

    public static EstimateType[] getAll() {
        // 方式1
        return EstimateType.class.getEnumConstants();
        // 方式2
        return EstimateType.values();
    }

    public static EstimateType match(Integer v) {
        return Stream.of(values()).parallel().filter(item -> item.getV() == v).findAny().orElse(null);
    }
}
```

枚举函数
XX.values();