> 泛型类
> 泛型方法
```java
public <E> List<BaseComponentPO> getList(BaseRepository baseRepository, Class<E> entityClass, Criteria criteria) {
    List<E> slabList = baseRepository.getMongoTemplate().find(Query.query(criteria), entityClass);
    List<BaseComponentPO> componentList = new ArrayList<>();
    for (E object : slabList) {
        componentList.add((BaseComponentPO) object);
    }
    return componentList;
}
```

> 静态赋值
```java
// 初始化器
List<ComponentType> components = new ArrayList<>(){{
    add(ComponentType.slab);
}};
```

> String indexOf 正则
```java
if(ReUtil.getGroup0(",|~", b.getBoundLayer()) != null) {
    return 1;
}
``` 