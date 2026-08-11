GitHub Pages部署说明


1. 创建GitHub仓库：
你的仓库名.github.io

2. 修改配置：

文件：config.js
第2行：
repository:"YOUR_GITHUB_REPO"

修改为：
repository:"你的GitHub仓库名称"

第3行：
baseUrl:"YOUR_GITHUB_PAGES_URL"

修改为：
baseUrl:"https://你的用户名.github.io"

3. Agent扩展：
agent/profile.json 保存人物设定
agent/content-schema.json 保存自动生成文章结构
