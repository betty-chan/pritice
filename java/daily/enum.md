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
        Optional<EstimateType> any = Arrays.stream(EstimateType.class.getEnumConstants())
                .filter(e -> e.getDesc().equals(desc))
                .findAny();
        if (any.isPresent()){
            return any.get();
        }
        return null;
    }

    public static EstimateType[] getAll() {
        EstimateType[] enumConstants = EstimateType.class.getEnumConstants();
    }

    public static DrawingSheetViewType match(Integer v) {
        return Stream.of(values()).parallel().filter(item -> item.getV() == v).findAny().orElse(null);
    }
}
```