import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  FileText, 
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Clock,
  Download,
  History
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface UploadFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'completed' | 'error' | 'queued';
  progress: number;
}

export default function DataUpload() {
  const navigate = useNavigate();
  const [files, setFiles] = useState<UploadFile[]>([
    {
      id: '1',
      name: 'fish_measurements_2024_01_15.csv',
      size: 2500000,
      type: 'data',
      status: 'completed',
      progress: 100
    },
    {
      id: '2', 
      name: 'biomass_data_tank_b.xlsx',
      size: 1800000,
      type: 'data',
      status: 'completed',
      progress: 100
    },
    {
      id: '3',
      name: 'manual_counts_tank_c.json',
      size: 850000,
      type: 'data',
      status: 'error',
      progress: 0
    }
  ]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    
    droppedFiles.forEach((file) => {
      const newFile: UploadFile = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type.includes('video') ? 'video' : file.type.includes('image') ? 'image' : 'data',
        status: 'uploading',
        progress: 0
      };
      
      setFiles(prev => [...prev, newFile]);
      
      // Simulate upload progress
      simulateUpload(newFile.id);
    });

    toast({
      title: "Files added",
      description: `${droppedFiles.length} file(s) added to upload queue`,
    });
  };

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          const newProgress = Math.min(file.progress + Math.random() * 15, 100);
          return {
            ...file,
            progress: newProgress,
            status: newProgress === 100 ? 'completed' : 'uploading'
          };
        }
        return file;
      }));
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      setFiles(prev => prev.map(file =>
        file.id === fileId ? { ...file, status: 'completed', progress: 100 } : file
      ));
    }, 3000);
  };

  const getFileIcon = (type: string) => {
    return FileText;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      case 'uploading': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Data Upload</h1>
        <p className="text-muted-foreground">Import fish measurement data and biomass information</p>
      </div>

      <Tabs defaultValue="file-upload" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="file-upload">File Upload</TabsTrigger>
          <TabsTrigger value="manual-entry">Manual Entry</TabsTrigger>
        </TabsList>

        <TabsContent value="file-upload" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upload Data Files */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Data Files
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  Data Files
                </div>
                
                <div
                  className="border-2 border-dashed border-muted rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => document.getElementById('file-input')?.click()}
                >
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <div className="space-y-2">
                    <p className="font-medium">Drop files here or click to browse</p>
                    <p className="text-sm text-muted-foreground">
                      Supports CSV, Excel, JSON files up to 50MB
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Choose files</span>
                  <span>No file chosen</span>
                </div>

                <Button className="w-full" onClick={() => document.getElementById('file-input')?.click()}>
                  Upload Files
                </Button>

                <input
                  id="file-input"
                  type="file"
                  multiple
                  accept=".csv,.xlsx,.xls,.json"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) {
                      const event = {
                        preventDefault: () => {},
                        dataTransfer: { files: e.target.files }
                      } as React.DragEvent;
                      handleDrop(event);
                    }
                  }}
                />
              </CardContent>
            </Card>

            {/* CSV Template */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  CSV Template
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Download our CSV template to ensure your data is formatted correctly for upload.
                </p>

                <div className="space-y-3">
                  <div className="text-sm font-medium">Template includes:</div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <strong>timestamp</strong> - Measurement date and time</li>
                    <li>• <strong>fish_id</strong> - Individual fish identifier (optional)</li>
                    <li>• <strong>weight_kg</strong> - Fish weight in kilograms</li>
                    <li>• <strong>length_cm</strong> - Fish length in centimeters</li>
                    <li>• <strong>tank_id</strong> - Tank identifier (A, B, C, etc.)</li>
                    <li>• <strong>species</strong> - Fish species (optional)</li>
                    <li>• <strong>notes</strong> - Additional observations (optional)</li>
                  </ul>
                </div>

                <Button variant="outline" className="w-full gap-2">
                  <Download className="h-4 w-4" />
                  Download CSV Template
                </Button>

                <div className="text-xs text-muted-foreground space-y-1">
                  <div><strong>Required fields:</strong> timestamp, weight_kg, length_cm, tank_id</div>
                  <div><strong>Date format:</strong> YYYY-MM-DD HH:MM:SS</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="manual-entry">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-12">
                <p className="text-muted-foreground">Manual entry form coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Upload History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Upload History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {files.map((file) => {
              const FileIcon = getFileIcon(file.type);
              return (
                <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileIcon className="h-6 w-6 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{file.name}</div>
                      <div className="text-sm text-muted-foreground">
                        2024-01-15 14:32:15 • {file.id === '1' ? '1247 records' : file.id === '2' ? '856 records' : '0 records'} • Tank {file.id === '1' ? 'A' : file.id === '2' ? 'B' : 'C'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant="outline" 
                      className={getStatusColor(file.status)}
                    >
                      {file.status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                      {file.status === 'error' && <AlertCircle className="h-3 w-3 mr-1" />}
                      {file.status === 'uploading' && <Clock className="h-3 w-3 mr-1" />}
                      {file.status === 'completed' ? 'Completed' : file.status === 'error' ? 'Failed' : 'Processing'}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}