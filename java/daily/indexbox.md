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