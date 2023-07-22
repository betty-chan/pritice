1. 添加文档

2. 修改文档
```java
private void updataBatch(String standardId, List<BuildingWallDeepen> dataList) {
    List<Integer> compIds = dataList.stream().map(data -> data.getCid()).collect(Collectors.toList());

    Criteria criteria = Criteria.where(ColumnUtils.currModel(BuildingWallDeepen::getStandard_id)).is(standardId)
    .and(ColumnUtils.currModel(BuildingWallDeepen::getCid)).in(compIds);
    Query query = new Query(criteria);



    getMongoTemplate().findAndModify(query, BuildingWallDeepen.class);
}
```

3. 删除文档

```java
private void removeBatch(String standardId, List<BuildingWallDeepen> dataList) {
    List<Integer> compIds = dataList.stream().map(data -> data.getCid()).collect(Collectors.toList());

    Criteria criteria = Criteria.where(ColumnUtils.currModel(BuildingWallDeepen::getStandard_id)).is(standardId)
    .and(ColumnUtils.currModel(BuildingWallDeepen::getCid)).in(compIds);
    Query query = new Query(criteria);
    
    getMongoTemplate().remove(query, BuildingWallDeepen.class);
}
```