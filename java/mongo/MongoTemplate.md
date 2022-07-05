1. 查询和排序
```java
default VersionStandard selectByVersionId(String versionId, String sortField, String sortType) {
    Query query = new Query();
    Criteria criteria = Criteria.where(ColumnUtils.currCols(VersionStandard::getVersionId)).is(versionId);
    query.addCriteria(criteria);
    if(StringUtils.isNotBlank(sortField)){
        if(sortType == "asc") {
            query.with(Sort.by(Sort.Order.asc(sortField)));
        } else {
            query.with(Sort.by(Sort.Order.desc(sortField)));
        }
    }
    return getMongoTemplate().findOne(query, VersionStandard.class);
}
```