import React, { useMemo, useState } from "react";
import {
  FileText,
  Upload,
  Download,
  Share2,
  FileScan,
  PenLine,
} from "lucide-react";
import { Card, CardHeader, CardBody } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { SignaturePad } from "../../components/feature/SignaturePad";
import { dealDocuments } from "../../data/platform";
import { Document } from "../../types";

const statusVariant: Record<
  NonNullable<Document["status"]>,
  "gray" | "warning" | "success"
> = {
  Draft: "gray",
  "In Review": "warning",
  Signed: "success",
};

export const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>(dealDocuments);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string>(
    dealDocuments[0].id,
  );
  const [signatureReady, setSignatureReady] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const selectedDocument = useMemo(
    () =>
      documents.find((document) => document.id === selectedDocumentId) ??
      documents[0],
    [documents, selectedDocumentId],
  );

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    const nextDocument: Document = {
      id: `doc-${Date.now()}`,
      name: file.name,
      type: file.type.includes("pdf")
        ? "PDF"
        : file.type.includes("word")
          ? "Document"
          : "File",
      size: `${Math.max(1, Math.round(file.size / 1024))} KB`,
      lastModified: new Date().toISOString().slice(0, 10),
      shared: false,
      url: URL.createObjectURL(file),
      ownerId: "current-user",
      status: "Draft",
      previewType: file.type.includes("pdf")
        ? "pdf"
        : file.type.includes("image")
          ? "image"
          : "doc",
    };

    setDocuments((previous) => [nextDocument, ...previous]);
    setSelectedDocumentId(nextDocument.id);
  };

  const updateStatus = (status: NonNullable<Document["status"]>) => {
    setDocuments((previous) =>
      previous.map((document) =>
        document.id === selectedDocumentId ? { ...document, status } : document,
      ),
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-3xl bg-gradient-to-r from-primary-700 via-secondary-700 to-accent-600 p-6 text-white shadow-xl">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">
            Week 2 milestone
          </p>
          <h1 className="mt-2 text-3xl font-bold">Document Chamber</h1>
          <p className="mt-2 max-w-2xl text-sm text-white/85">
            Upload contracts, preview files, apply a mock signature, and move
            each document from draft to signed.
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="gray">Draft</Badge>
          <Badge variant="warning">In Review</Badge>
          <Badge variant="success">Signed</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Storage info */}
        <Card className="lg:col-span-1 border border-gray-200 shadow-lg">
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">
              Document chamber
            </h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-primary-300 bg-primary-50/70 px-4 py-6 text-center transition hover:bg-primary-50">
              <Upload size={20} className="text-primary-700" />
              <span className="mt-2 text-sm font-medium text-gray-900">
                Upload PDF or DOC
              </span>
              <span className="text-xs text-gray-500">
                Preview and sign contracts locally
              </span>
              <input type="file" className="hidden" onChange={handleUpload} />
            </label>

            {uploadedFileName && (
              <p className="text-xs text-gray-500">
                Uploaded: {uploadedFileName}
              </p>
            )}

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Used</span>
                <span className="font-medium text-gray-900">12.5 GB</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-primary-600 rounded-full"
                  style={{ width: "65%" }}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Available</span>
                <span className="font-medium text-gray-900">7.5 GB</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Quick access
              </h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                  Recent Files
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                  Shared with Me
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                  Starred
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                  Trash
                </button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Document list */}
        <div className="lg:col-span-3">
          <Card className="border border-gray-200 shadow-lg">
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                Contract preview
              </h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Sort by
                </Button>
                <Button variant="outline" size="sm">
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardBody className="space-y-6">
              <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-3xl border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-gray-500">
                        Selected document
                      </p>
                      <h3 className="mt-1 text-xl font-semibold text-gray-900">
                        {selectedDocument.name}
                      </h3>
                    </div>
                    {selectedDocument.status && (
                      <Badge variant={statusVariant[selectedDocument.status]}>
                        {selectedDocument.status}
                      </Badge>
                    )}
                  </div>

                  <div className="mt-4 rounded-2xl border border-dashed border-gray-300 bg-white p-4">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <FileScan className="text-primary-600" size={20} />
                      <span>
                        {selectedDocument.type} • {selectedDocument.size} •
                        Modified {selectedDocument.lastModified}
                      </span>
                    </div>
                    <div className="mt-4 rounded-2xl bg-gradient-to-br from-white to-primary-50 p-5 text-sm text-gray-700">
                      <p className="font-semibold text-gray-900">
                        Preview pane
                      </p>
                      <p className="mt-2">
                        Use this space for PDF rendering, inline annotation, or
                        contract comparison. The current mock highlights the
                        document chamber layout.
                      </p>
                      <div className="mt-4 flex gap-2">
                        <Badge variant="gray">
                          {selectedDocument.previewType ?? "doc"}
                        </Badge>
                        <Badge
                          variant={
                            selectedDocument.shared ? "secondary" : "gray"
                          }
                        >
                          {selectedDocument.shared ? "Shared" : "Private"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Download size={18} />}
                    >
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Share2 size={18} />}
                    >
                      Share
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<PenLine size={18} />}
                      onClick={() => updateStatus("In Review")}
                    >
                      Mark in review
                    </Button>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => updateStatus("Signed")}
                    >
                      Mark signed
                    </Button>
                  </div>
                </div>

                <div className="space-y-4 rounded-3xl border border-gray-200 p-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-gray-500">
                      Sign here
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-gray-900">
                      Signature mockup
                    </h3>
                  </div>
                  <SignaturePad onSignatureChange={setSignatureReady} />
                  <Button
                    fullWidth
                    variant={signatureReady ? "success" : "outline"}
                    disabled={!signatureReady}
                    onClick={() => updateStatus("Signed")}
                  >
                    {signatureReady ? "Apply signature" : "Signature required"}
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-gray-500">
                  All documents
                </h3>
                <div className="space-y-2">
                  {documents.map((doc) => (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => setSelectedDocumentId(doc.id)}
                      className={`flex w-full items-center rounded-2xl p-4 text-left transition ${doc.id === selectedDocument.id ? "bg-primary-50 ring-1 ring-primary-200" : "hover:bg-gray-50"}`}
                    >
                      <div className="p-2 bg-primary-50 rounded-lg mr-4">
                        <FileText size={24} className="text-primary-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {doc.name}
                          </h3>
                          {doc.shared && (
                            <Badge variant="secondary" size="sm">
                              Shared
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                          <span>{doc.type}</span>
                          <span>{doc.size}</span>
                          <span>Modified {doc.lastModified}</span>
                        </div>
                      </div>
                      {doc.status && (
                        <Badge variant={statusVariant[doc.status]}>
                          {doc.status}
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
