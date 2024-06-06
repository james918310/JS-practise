import urllib.request as req
import bs4
#爬ppt八卦版
urt="https://www.ptt.cc/bbs/Gossiping/index.html"
def takeint(urt,cleandata=[]):
  pptnet=req.Request(urt, headers={
      "Cookie":"over18=1",
      "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36"})
  with req.urlopen(pptnet) as ppt:
      data=ppt.read().decode("utf-8")
    #  print(data)
  #解析html
  root=bs4.BeautifulSoup(data,"html.parser")
  data2=root.find_all("div",class_="title")   
  for i in data2:
      if i.a != None:
        print(i.a.string)
        cleandata.append(i.a.string)
  with open("request2.txt",mode="w",encoding="utf-8") as fit:
      for i in cleandata:
        fit.write(str(i)+"\n")
            
  #抓取下一頁
  nextlin=root.find("a",string="‹ 上頁")
  return nextlin["href"]


#主程式
cleandata=[]
urt="https://www.ptt.cc/bbs/Gossiping/index.html"
x=int(input("輸入抓取頁數 :"))
for i in range(1,x+1):
  urt="https://www.ptt.cc"+takeint(urt,cleandata)