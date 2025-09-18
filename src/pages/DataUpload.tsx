import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileVideo, 
  FileImage, 
  FileText, 
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Clock
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
      name: 'tank_01_morning_feed.mp4',
      size: 125000000,
      type: 'video',
      status: 'completed',
      progress: 100
    },
    {
      id: '2', 
      name: 'species_count_data.csv',
      size: 2500000,
      type: 'data',
      status: 'completed',
      progress: 100
    },
    {
      id: '3',
      name: 'camera_02_maintenance.jpg',
      size: 5000000,
      type: 'image',
      status: 'uploading',
      progress: 67
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
    switch (type) {
      case 'video': return FileVideo;
      case 'image': return FileImage;
      default: return FileText;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success text-white';
      case 'error': return 'bg-destructive text-white';
      case 'uploading': return 'bg-warning text-white';
      default: return 'bg-muted text-muted-foreground';
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Data Upload</h1>
            <p className="text-muted-foreground">Upload monitoring data and footage</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Zone */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Files
            </CardTitle>
            <CardDescription>
              Drag and drop files or click to browse. Supports video, images, and data files.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="border-2 border-dashed border-muted rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Drop files here</h3>
              <p className="text-muted-foreground mb-4">
                or click to browse your computer
              </p>
              <Button variant="outline" className="gap-2">
                <Upload className="h-4 w-4" />
                Choose Files
              </Button>
              <input
                id="file-input"
                type="file"
                multiple
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
            </div>
          </CardContent>
        </Card>

        {/* Upload Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Today's Uploads</span>
                <span className="font-medium">24 files</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Storage Used</span>
                <span className="font-medium">2.1 GB / 10 GB</span>
              </div>
              <Progress value={21} className="h-2" />
            </div>

            <div className="pt-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Video Files</span>
                <Badge variant="secondary">8</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Data Files</span>
                <Badge variant="secondary">12</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Images</span>
                <Badge variant="secondary">4</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* File List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Uploads</CardTitle>
          <CardDescription>
            Monitor upload progress and manage your files
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {files.map((file) => {
              const FileIcon = getFileIcon(file.type);
              return (
                <div key={file.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <FileIcon className="h-8 w-8 text-muted-foreground" />
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{file.name}</h4>
                      <Badge className={getStatusColor(file.status)} variant="secondary">
                        {file.status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                        {file.status === 'error' && <AlertCircle className="h-3 w-3 mr-1" />}
                        {file.status === 'uploading' && <Clock className="h-3 w-3 mr-1" />}
                        {file.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">
                        {formatFileSize(file.size)}
                      </span>
                      {file.status === 'uploading' && (
                        <div className="flex-1">
                          <Progress value={file.progress} className="h-1" />
                        </div>
                      )}
                    </div>
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