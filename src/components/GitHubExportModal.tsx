import React, { useState } from 'react';
import {
  X,
  Download,
  FileCode,
  FileText,
  Palette,
  Terminal,
  Check,
  Copy,
  FolderArchive,
  ExternalLink,
  Globe,
  Sparkles,
  HelpCircle,
  Code2,
} from 'lucide-react';
import { GithubIcon } from './icons/GithubIcon';
import {
  generateStandaloneHTML,
  generateStandaloneCSS,
  generateStandaloneJS,
  generateStandaloneREADME,
  downloadFile,
  downloadCompleteZip,
} from '../utils/githubExport';

interface GitHubExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'download' | 'preview' | 'guide';
type PreviewFileType = 'html' | 'css' | 'js' | 'readme';

export const GitHubExportModal: React.FC<GitHubExportModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('download');
  const [previewFile, setPreviewFile] = useState<PreviewFileType>('html');
  const [isZipping, setIsZipping] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownloadZip = async () => {
    try {
      setIsZipping(true);
      await downloadCompleteZip();
    } catch (err) {
      console.error('Failed to create zip:', err);
    } finally {
      setIsZipping(false);
    }
  };

  const handleCopyCode = (content: string, type: string) => {
    navigator.clipboard.writeText(content);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 2500);
  };

  const getPreviewContent = () => {
    switch (previewFile) {
      case 'html':
        return generateStandaloneHTML();
      case 'css':
        return generateStandaloneCSS();
      case 'js':
        return generateStandaloneJS();
      case 'readme':
        return generateStandaloneREADME();
      default:
        return '';
    }
  };

  const gitCliCommands = `# 1. Ekstrak file zip ke dalam sebuah folder baru
# 2. Buka terminal di folder tersebut, lalu jalankan:

git init
git add .
git commit -m "feat: Salam Kopi Website initial commit"
git branch -M main

# 3. Hubungkan ke GitHub repository milikmu (ganti username & nama-repo)
git remote add origin https://github.com/USERNAME_ANDA/NAMA_REPO_ANDA.git
git push -u origin main

# Selesai! Buka GitHub repo > Settings > Pages untuk mengaktifkan website online.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-[#D7C4B7] overflow-hidden">
        
        {/* Header Modal */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#451A03] to-[#29170E] text-[#FAF7F2] flex items-center justify-between border-b border-[#3D2316]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C2410C] flex items-center justify-center text-white shadow-md">
              <GithubIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl font-bold tracking-tight">
                  Download Kode Website untuk GitHub
                </h3>
                <span className="bg-[#FDE68A] text-[#451A03] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider hidden sm:inline-block">
                  HTML · CSS · JS
                </span>
              </div>
              <p className="text-xs text-[#D7C4B7] mt-0.5">
                File mandiri (zero-dependency) siap upload ke GitHub & aktif gratis di GitHub Pages.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-[#D7C4B7] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E7DFD5] bg-white px-4 sm:px-6 pt-2 overflow-x-auto no-scrollbar gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('download')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'download'
                ? 'border-[#C2410C] text-[#C2410C]'
                : 'border-transparent text-[#78716C] hover:text-[#292524]'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Unduh Paket File (ZIP)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'preview'
                ? 'border-[#C2410C] text-[#C2410C]'
                : 'border-transparent text-[#78716C] hover:text-[#292524]'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Lihat & Salin Kode</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'guide'
                ? 'border-[#C2410C] text-[#C2410C]'
                : 'border-transparent text-[#78716C] hover:text-[#292524]'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Panduan Upload GitHub & Online Gratis</span>
          </button>
        </div>

        {/* Tab Content Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* TAB 1: DOWNLOAD CENTER */}
          {activeTab === 'download' && (
            <div className="space-y-6">
              
              {/* Highlight Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#FFF7ED] to-[#FEF3C7] border border-[#FDE68A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C2410C]" />
                    <h4 className="font-serif text-base font-bold text-[#451A03]">
                      Paket Lengkap Siap Upload GitHub (Direkomendasikan)
                    </h4>
                  </div>
                  <p className="text-xs text-[#78350F] max-w-xl">
                    Berisi semua file <strong>index.html</strong>, <strong>style.css</strong>, <strong>app.js</strong>, dan <strong>README.md</strong> dalam satu file ZIP rapi. Cukup ekstrak dan upload langsung ke repository GitHub Anda!
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleDownloadZip}
                  disabled={isZipping}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer flex-shrink-0"
                >
                  <FolderArchive className="w-4 h-4" />
                  <span>{isZipping ? 'Menyiapkan ZIP...' : 'Download Semua File (.ZIP)'}</span>
                </button>
              </div>

              {/* Individual File Download Cards */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#78716C] mb-3">
                  Atau Unduh File Terpisah Secara Manual:
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  
                  {/* index.html */}
                  <div className="p-4 rounded-2xl bg-white border border-[#E7DFD5] hover:border-[#C2410C]/40 transition-all flex items-center justify-between gap-3 shadow-2xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center flex-shrink-0">
                        <FileCode className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs font-bold text-[#292524]">index.html</span>
                          <span className="text-[10px] bg-[#EFE8DD] text-[#78716C] px-1.5 py-0.2 rounded font-medium">HTML5</span>
                        </div>
                        <p className="text-[11px] text-[#78716C] truncate mt-0.5">
                          Struktur web, navigasi, katalog kopi, keranjang, dasbor & kasir
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => downloadFile('index.html', generateStandaloneHTML(), 'text/html')}
                      className="px-3 py-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#EFE8DD] text-xs font-semibold text-[#451A03] border border-[#D7C4B7] flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Unduh</span>
                    </button>
                  </div>

                  {/* style.css */}
                  <div className="p-4 rounded-2xl bg-white border border-[#E7DFD5] hover:border-[#C2410C]/40 transition-all flex items-center justify-between gap-3 shadow-2xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
                        <Palette className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs font-bold text-[#292524]">style.css</span>
                          <span className="text-[10px] bg-[#EFE8DD] text-[#78716C] px-1.5 py-0.2 rounded font-medium">CSS3</span>
                        </div>
                        <p className="text-[11px] text-[#78716C] truncate mt-0.5">
                          Gaya visual warm coffee aesthetic, font Playfair & custom scrollbars
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => downloadFile('style.css', generateStandaloneCSS(), 'text/css')}
                      className="px-3 py-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#EFE8DD] text-xs font-semibold text-[#451A03] border border-[#D7C4B7] flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Unduh</span>
                    </button>
                  </div>

                  {/* app.js */}
                  <div className="p-4 rounded-2xl bg-white border border-[#E7DFD5] hover:border-[#C2410C]/40 transition-all flex items-center justify-between gap-3 shadow-2xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
                        <Terminal className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs font-bold text-[#292524]">app.js</span>
                          <span className="text-[10px] bg-[#EFE8DD] text-[#78716C] px-1.5 py-0.2 rounded font-medium">ES6 JS</span>
                        </div>
                        <p className="text-[11px] text-[#78716C] truncate mt-0.5">
                          Logika keranjang, kuis barista, checkout, kalkulasi diskon & POS
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => downloadFile('app.js', generateStandaloneJS(), 'application/javascript')}
                      className="px-3 py-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#EFE8DD] text-xs font-semibold text-[#451A03] border border-[#D7C4B7] flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Unduh</span>
                    </button>
                  </div>

                  {/* README.md */}
                  <div className="p-4 rounded-2xl bg-white border border-[#E7DFD5] hover:border-[#C2410C]/40 transition-all flex items-center justify-between gap-3 shadow-2xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs font-bold text-[#292524]">README.md</span>
                          <span className="text-[10px] bg-[#EFE8DD] text-[#78716C] px-1.5 py-0.2 rounded font-medium">Docs</span>
                        </div>
                        <p className="text-[11px] text-[#78716C] truncate mt-0.5">
                          Instruksi lengkap cara push git dan mengaktifkan GitHub Pages
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => downloadFile('README.md', generateStandaloneREADME(), 'text/markdown')}
                      className="px-3 py-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#EFE8DD] text-xs font-semibold text-[#451A03] border border-[#D7C4B7] flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Unduh</span>
                    </button>
                  </div>

                </div>
              </div>

              {/* Zero-Dependency Guarantee */}
              <div className="p-4 rounded-2xl bg-[#EFE8DD] border border-[#E7DFD5] flex items-start gap-3 text-xs text-[#57534E]">
                <HelpCircle className="w-4 h-4 text-[#C2410C] flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-[#292524]">Zero-Dependency & Siap Pakai Langsung:</span>
                  <p>
                    Kompilasi ini tidak membutuhkan server khusus atau Node.js! Anda dapat menguji langsung dengan <strong>mengklik ganda file index.html</strong> di komputer lokal Anda, atau mengunggahnya ke GitHub Pages, Vercel, Netlify, maupun cPanel hosting tanpa perlu build command.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: CODE PREVIEW & COPY */}
          {activeTab === 'preview' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E7DFD5]">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                  <button
                    type="button"
                    onClick={() => setPreviewFile('html')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      previewFile === 'html'
                        ? 'bg-[#451A03] text-white shadow-xs'
                        : 'bg-white text-[#78716C] hover:bg-[#EFE8DD]'
                    }`}
                  >
                    index.html
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewFile('css')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      previewFile === 'css'
                        ? 'bg-[#451A03] text-white shadow-xs'
                        : 'bg-white text-[#78716C] hover:bg-[#EFE8DD]'
                    }`}
                  >
                    style.css
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewFile('js')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      previewFile === 'js'
                        ? 'bg-[#451A03] text-white shadow-xs'
                        : 'bg-white text-[#78716C] hover:bg-[#EFE8DD]'
                    }`}
                  >
                    app.js
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewFile('readme')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      previewFile === 'readme'
                        ? 'bg-[#451A03] text-white shadow-xs'
                        : 'bg-white text-[#78716C] hover:bg-[#EFE8DD]'
                    }`}
                  >
                    README.md
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopyCode(getPreviewContent(), previewFile)}
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#EFE8DD] text-[#451A03] border border-[#D7C4B7] text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                  >
                    {copiedType === previewFile ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Tersalin ke Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Seluruh Kode</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => downloadFile(`${previewFile === 'html' ? 'index.html' : previewFile === 'css' ? 'style.css' : previewFile === 'js' ? 'app.js' : 'README.md'}`, getPreviewContent(), 'text/plain')}
                    className="px-3 py-1.5 rounded-xl bg-[#451A03] hover:bg-[#290E02] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#FDE68A]" />
                    <span>Download File</span>
                  </button>
                </div>
              </div>

              {/* Code Box */}
              <div className="relative rounded-2xl bg-[#1C1917] text-[#FAF7F2] p-4 font-mono text-xs leading-relaxed max-h-[500px] overflow-y-auto border border-[#44403C] shadow-inner select-all">
                <pre className="whitespace-pre-wrap break-all font-mono">
                  {getPreviewContent()}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: STEP-BY-STEP GITHUB & GITHUB PAGES GUIDE */}
          {activeTab === 'guide' && (
            <div className="space-y-6 text-xs text-[#44403C]">
              
              {/* Introduction Banner */}
              <div className="p-4 rounded-2xl bg-white border border-[#E7DFD5] shadow-xs flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#292524]">
                    Ingin Website Ini Langsung Online dan Bisa Diakses Siapapun?
                  </h4>
                  <p className="text-[11px] text-[#78716C] mt-0.5">
                    Ikuti 3 langkah mudah berikut untuk mengupload ke GitHub dan mengaktifkan GitHub Pages (100% Gratis selamanya).
                  </p>
                </div>
                <a
                  href="https://github.com/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-[#451A03] hover:bg-[#290E02] text-white font-bold text-xs flex items-center gap-1.5 flex-shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Buka GitHub</span>
                </a>
              </div>

              {/* Steps */}
              <div className="space-y-4">
                
                {/* Step 1 */}
                <div className="p-4 rounded-2xl bg-white border border-[#E7DFD5] space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#C2410C] text-white flex items-center justify-center font-bold text-xs">
                      1
                    </span>
                    <h5 className="font-bold text-sm text-[#292524]">
                      Buat Repository Baru di GitHub
                    </h5>
                  </div>
                  <ul className="list-disc pl-9 space-y-1 text-[#57534E]">
                    <li>Buka <a href="https://github.com/new" target="_blank" rel="noopener noreferrer" className="text-[#C2410C] underline font-semibold">github.com/new</a> dan login ke akun GitHub Anda.</li>
                    <li>Beri nama repository, misalnya: <code className="bg-[#FAF7F2] px-1.5 py-0.5 rounded text-[#C2410C] font-mono font-bold">salam-kopi</code>.</li>
                    <li>Pilih opsi <strong>Public</strong> agar fitur GitHub Pages bisa aktif gratis.</li>
                    <li>Klik tombol hijau <strong>Create repository</strong> di bagian bawah.</li>
                  </ul>
                </div>

                {/* Step 2 */}
                <div className="p-4 rounded-2xl bg-white border border-[#E7DFD5] space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#C2410C] text-white flex items-center justify-center font-bold text-xs">
                      2
                    </span>
                    <h5 className="font-bold text-sm text-[#292524]">
                      Upload File HTML, CSS, JS
                    </h5>
                  </div>
                  <div className="pl-9 space-y-2 text-[#57534E]">
                    <p>
                      Ekstrak file <strong>salam-kopi-github-package.zip</strong> yang sudah Anda download. Di halaman repository GitHub yang baru Anda buat, klik link <span className="font-bold text-[#292524]">"uploading an existing file"</span>.
                    </p>
                    <p>
                      Tarik (drag & drop) file-file berikut ke kotak upload:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-[11px]">
                      <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#E7DFD5] text-center font-bold">index.html</div>
                      <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#E7DFD5] text-center font-bold">style.css</div>
                      <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#E7DFD5] text-center font-bold">app.js</div>
                      <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#E7DFD5] text-center font-bold">README.md</div>
                    </div>
                    <p className="pt-1">
                      Ketikkan pesan commit (misalnya: <em>"Upload website Salam Kopi"</em>), lalu klik tombol hijau <strong className="text-[#292524]">Commit changes</strong>.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-4 rounded-2xl bg-white border border-[#E7DFD5] space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                      3
                    </span>
                    <h5 className="font-bold text-sm text-[#292524]">
                      Aktifkan GitHub Pages (Website Langsung Online!)
                    </h5>
                  </div>
                  <ul className="list-disc pl-9 space-y-1.5 text-[#57534E]">
                    <li>Di halaman repository Anda, klik menu tab <strong className="text-[#292524]">Settings</strong> (di bagian atas kanan).</li>
                    <li>Pada menu bilah sisi kiri, klik menu <strong className="text-[#292524]">Pages</strong>.</li>
                    <li>Di bagian <strong className="text-[#292524]">Build and deployment</strong>:
                      <ul className="list-circle pl-5 mt-1 space-y-0.5">
                        <li>Source: pilih <strong>Deploy from a branch</strong></li>
                        <li>Branch: pilih <strong>main</strong> (atau <strong>master</strong>) dan folder <strong>/ (root)</strong></li>
                        <li>Klik tombol <strong>Save</strong></li>
                      </ul>
                    </li>
                    <li>Tunggu sekitar 1–2 menit, lalu muat ulang (refresh) halaman. Link website Anda akan muncul di bagian atas:</li>
                    <li className="font-mono text-emerald-800 font-bold bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                      https://[username-github-anda].github.io/salam-kopi/
                    </li>
                  </ul>
                </div>

                {/* CLI Command Alternative */}
                <div className="p-4 rounded-2xl bg-[#29170E] text-[#FAF7F2] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-[#FDE68A]" />
                      <span className="font-mono text-xs font-bold text-[#FDE68A]">
                        Alternatif: Upload Menggunakan Git Terminal (CLI)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(gitCliCommands, 'git-cli')}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-sans font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      {copiedType === 'git-cli' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-300">Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Salin Perintah</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="font-mono text-[11px] text-[#D7C4B7] bg-black/40 p-3 rounded-xl overflow-x-auto leading-relaxed">
                    {gitCliCommands}
                  </pre>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#E7DFD5] flex items-center justify-between">
          <p className="text-[11px] text-[#78716C] hidden sm:block">
            Semua aset gambar menggunakan CDN Unsplash resmi berlisensi gratis.
          </p>
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-[#D7C4B7] text-xs font-bold text-[#57534E] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
            >
              Tutup
            </button>
            <button
              type="button"
              onClick={handleDownloadZip}
              disabled={isZipping}
              className="px-5 py-2.5 rounded-xl bg-[#451A03] hover:bg-[#290E02] text-[#FDE68A] text-xs font-bold flex items-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isZipping ? 'Memproses...' : 'Download ZIP Sekarang'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
