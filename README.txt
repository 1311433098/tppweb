使用说明

使用时请在公共文件里面include  index.php文件 其他文件将会自动包含


csrf验证分为两部分
1：在form中使用<?php echo form_sub()?>添加隐藏域
2：后台php文件中使用 form_check（）将自动完成表单验证，如非发则返回error_request并终止程序


