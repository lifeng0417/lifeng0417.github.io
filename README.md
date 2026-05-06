# Academic Homepage

这是一个可以直接部署到 GitHub Pages 的个人学术主页模板。页面内容集中维护在 `data.json`，适合展示个人简介、研究经历、学术成果、联系方式和学术链接。

## 文件说明

- `index.html`: 页面结构与 SEO 基础信息。
- `styles.css`: 页面样式。
- `script.js`: 读取 `data.json` 并渲染主页内容。
- `data.json`: 你的个人信息、研究经历、论文和链接。后续主要修改这个文件。

## 第一次发布到 GitHub Pages

### 方式一：发布到个人主页仓库

如果你的 GitHub 用户名是 `your-github-username`，创建一个名为：

```bash
your-github-username.github.io
```

的公开仓库。这个仓库发布后，访问地址通常是：

```text
https://your-github-username.github.io/
```

然后在本地执行：

```bash
git init
git add .
git commit -m "Create academic homepage"
git branch -M main
git remote add origin https://github.com/your-github-username/your-github-username.github.io.git
git push -u origin main
```

推送完成后，进入 GitHub 仓库页面：

```text
Settings -> Pages -> Build and deployment -> Source -> Deploy from a branch
```

选择：

```text
Branch: main
Folder: /root
```

保存后等待 1-3 分钟，主页即可访问。

### 方式二：发布到普通项目仓库

如果仓库不是 `your-github-username.github.io`，例如 `academic-homepage`，访问地址通常是：

```text
https://your-github-username.github.io/academic-homepage/
```

这时需要把 `data.json` 里的 `siteUrl` 改成这个地址，并把 `index.html` 里的 canonical 链接也改成这个地址。

## 如何修改个人信息

打开 `data.json`，替换以下字段：

- `name`: 你的姓名。
- `title`: 你的身份，例如 Ph.D. Student、Research Assistant、Assistant Professor。
- `affiliation`: 学校、学院、实验室或机构。
- `siteUrl`: 你的主页 URL。
- `photo`: 个人照片路径，例如 `assets/profile.jpg`。如果不放照片，保留空字符串。
- `summary`: 主页顶部的一句话简介。
- `biography`: 个人简介段落。
- `links`: Google Scholar、ORCID、GitHub、LinkedIn 等链接。
- `experience`: 研究经历。
- `publications`: 论文、会议、期刊、预印本或 working paper。
- `contact`: 邮箱和其他联系方式。

每次修改后执行：

```bash
git add .
git commit -m "Update homepage content"
git push
```

GitHub Pages 会自动重新部署。

## 如何添加照片

创建 `assets` 文件夹，把照片放进去，例如：

```text
assets/profile.jpg
```

然后把 `data.json` 中的字段改为：

```json
"photo": "assets/profile.jpg"
```

照片建议使用正方形或接近正方形，大小控制在 500KB-1MB 左右。

## 搜索引擎收录建议

发布后，搜索引擎可能需要几天到几周才会收录。为了更容易被搜索到：

- 使用 `你的姓名 + academic homepage`、`你的姓名 + 学校` 这样的清晰标题和简介。
- 在 Google Scholar、ORCID、GitHub、LinkedIn、学校个人页中互相链接到这个主页。
- 保持仓库公开。
- 在 `data.json` 中填写真实姓名、机构、研究关键词、论文标题。
- 发布后可以到 Google Search Console 提交主页 URL。

## 本地预览

因为页面通过 `fetch("data.json")` 读取数据，建议用本地服务器预览：

```bash
python3 -m http.server 8000
```

然后打开：

```text
http://localhost:8000
```
