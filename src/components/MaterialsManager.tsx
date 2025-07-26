import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, Video, FileQuestion, Trash2, Plus } from "lucide-react";

interface Material {
  id: string;
  title: string;
  material_type: string;
  file_url: string;
  content_text: string;
  sort_order: number;
  is_free: boolean;
}

interface MaterialsManagerProps {
  courseId: string;
}

const MaterialsManager = ({ courseId }: MaterialsManagerProps) => {
  const { toast } = useToast();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    title: "",
    material_type: "video" as const,
    is_free: false,
  });
  const [uploadingFile, setUploadingFile] = useState(false);

  useEffect(() => {
    fetchMaterials();
  }, [courseId]);

  const fetchMaterials = async () => {
    try {
      const { data, error } = await supabase
        .from('course_materials')
        .select('*')
        .eq('course_id', courseId)
        .order('sort_order');

      if (error) throw error;
      setMaterials(data || []);
    } catch (error) {
      console.error('Error fetching materials:', error);
    }
  };

  const handleFileUpload = async (file: File) => {
    setUploadingFile(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${courseId}/${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('course-materials')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('course-materials')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      });
      return null;
    } finally {
      setUploadingFile(false);
    }
  };

  const handleCreateMaterial = async (fileUrl?: string) => {
    try {
      const { error } = await supabase
        .from('course_materials')
        .insert([{
          course_id: courseId,
          title: newMaterial.title,
          material_type: newMaterial.material_type,
          file_url: fileUrl || '',
          sort_order: materials.length,
          is_free: newMaterial.is_free,
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Material added successfully",
      });

      setNewMaterial({ title: "", material_type: "video", is_free: false });
      setShowForm(false);
      fetchMaterials();
    } catch (error) {
      console.error('Error creating material:', error);
      toast({
        title: "Error",
        description: "Failed to add material",
        variant: "destructive",
      });
    }
  };

  const handleDeleteMaterial = async (materialId: string) => {
    if (!confirm('Are you sure you want to delete this material?')) return;

    try {
      const { error } = await supabase
        .from('course_materials')
        .delete()
        .eq('id', materialId);

      if (error) throw error;

      setMaterials(materials.filter(m => m.id !== materialId));
      toast({
        title: "Success",
        description: "Material deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting material:', error);
      toast({
        title: "Error",
        description: "Failed to delete material",
        variant: "destructive",
      });
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'pdf': case 'document': return <FileText className="h-4 w-4" />;
      case 'quiz': case 'assignment': return <FileQuestion className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="mt-4 border-t pt-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold">Course Materials</h4>
        <Button
          size="sm"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Material
        </Button>
      </div>

      {showForm && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg">Add New Material</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={newMaterial.title}
                  onChange={(e) => setNewMaterial(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Material title"
                />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select
                  value={newMaterial.material_type}
                  onValueChange={(value: any) => setNewMaterial(prev => ({ ...prev, material_type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="document">Document</SelectItem>
                    <SelectItem value="quiz">Quiz</SelectItem>
                    <SelectItem value="assignment">Assignment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={newMaterial.is_free}
                onCheckedChange={(checked) => setNewMaterial(prev => ({ ...prev, is_free: checked }))}
              />
              <Label>Free preview</Label>
            </div>

            <div className="space-y-2">
              <Label>Upload File</Label>
              <Input
                type="file"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const url = await handleFileUpload(file);
                    if (url) {
                      handleCreateMaterial(url);
                    }
                  }
                }}
                disabled={uploadingFile}
              />
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => handleCreateMaterial()}
                disabled={!newMaterial.title || uploadingFile}
              >
                {uploadingFile ? "Uploading..." : "Add Material"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {materials.map((material) => (
          <div key={material.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              {getIcon(material.material_type)}
              <div>
                <div className="font-medium">{material.title}</div>
                <div className="flex gap-2">
                  <Badge variant="outline">{material.material_type}</Badge>
                  {material.is_free && <Badge variant="secondary">Free</Badge>}
                </div>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleDeleteMaterial(material.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaterialsManager;