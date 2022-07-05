try catch
```java
    try {
        ReflectUtil.setFieldValue(this, fieldName, value);
    } catch (Exception e) {
        System.out.println(e.getMessage());
    }
```