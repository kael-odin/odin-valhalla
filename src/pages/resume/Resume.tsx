import { useMemo } from "react";
import { Download, ExternalLink } from "lucide-react";
import useLanguage from "@hooks/useLanguage";
import { getResume } from "@data/resume";
import { withBase } from "@utils/withBase";
import { st } from "@/i18n/sections";
import { MAX_WIDTH_WIDE } from "@/constants/theme";
import PageSection from "@components/layout/PageSection";
import BrowserMockup from "@components/ui/BrowserMockup";

/**
 * 简历分区：紧跟首屏（Hero 之后第一个内容分区），访客下滑即见、
 * 无需点击。浏览器原生 PDF 预览优先（无第三方登录墙），
 * 按钮行提供「下载完整简历」与 kdocs 在线版入口。
 */
const Resume = () => {
   const { language } = useLanguage();
   const resume = useMemo(() => getResume(language), [language]);

   // 根绝对路径必须拼上 BASE_URL（GitHub Pages 子路径部署），否则 404
   const pdfUrl = withBase(resume.resume.pdf_url);
   const onlineUrl = resume.resume.online_url.trim();
   // 本地 PDF 优先（无第三方登录墙）；两者都没有时回退在线文档
   const embedUrl = pdfUrl ? `${pdfUrl}#view=FitH` : onlineUrl;

   return (
      <PageSection
         id="resume"
         title={st(language, "resume.title")}
         subtitle={st(language, "resume.sub")}
         maxWidth={MAX_WIDTH_WIDE}
      >
         <BrowserMockup path={[st(language, "resume.embedTitle")]}>
            {embedUrl ? (
               <iframe
                  src={embedUrl}
                  title={st(language, "resume.embedTitle")}
                  style={{
                     display: "block",
                     width: "100%",
                     height: "min(78vh, 900px)",
                     border: "none",
                     background: "#fff",
                  }}
                  loading="lazy"
               />
            ) : (
               <div
                  style={{
                     minHeight: 280,
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                     color: "#8b93a5",
                     fontSize: 14,
                  }}
               >
                  {resume.resume.note}
               </div>
            )}
         </BrowserMockup>

         <div
            style={{
               display: "flex",
               flexWrap: "wrap",
               gap: 10,
               justifyContent: "flex-end",
               marginTop: 14,
            }}
         >
            {pdfUrl && (
               <a
                  href={pdfUrl}
                  download="汤勇-简历.pdf"
                  className="btn-primary inline-flex items-center justify-center gap-2 text-sm"
               >
                  <Download size={15} aria-hidden="true" />
                  {st(language, "resume.openPdf")}
               </a>
            )}
            {onlineUrl && (
               <a
                  href={onlineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline inline-flex items-center justify-center gap-2 text-sm"
               >
                  <ExternalLink size={15} aria-hidden="true" />
                  {st(language, "resume.openOnline")}
               </a>
            )}
         </div>
      </PageSection>
   );
};

export default Resume;
