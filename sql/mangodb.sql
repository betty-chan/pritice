--删除集合
db.getCollection("tryone").drop();
db.collection.drop("tryone");
--创建集合
db.createCollection("tryone");
--清空集合
db.collection.remove("tryone");


--查询文档
db.getCollection("t_ver_standard").find({"version_id":"62578b8deea6ce0012ddb3c0"})
--查询文档字段对应数组中包含某个值
db.getCollection("t_ver_standard").find({"info_sort":{$elemMatch:{ standardId: "62578b8deea6ce0012ddb3c1" }} })
-- 查询条件操作符
-- 等于：{<key>:<value>}
-- 不等于：{<key>:{$ne:<value>}}
-- 小于或等于：{<key>:{$lte:<value>}}
-- 大于：{<key>:{$gt:<value>}}
-- 大于或等于：	{<key>:{$gte:<value>}}
db.getCollection("t_ver_standard").find({"info_sort":{$elemMatch:{ standardId: "625ce67ee59669001aaf032a",boundLayer:{$ne:""} }} })
-- and条件
-- or条件


-- 更新文档
db.getCollection("c_slab").update({'title':'MongoDB 教程'},{$set:{'title':'MongoDB'}})


--删除文档