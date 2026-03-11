// Script para testar conexão com Cloudinary
import cloudinary from '../lib/cloudinary';

async function testCloudinary() {
    try {
        console.log('🔍 Testando conexão com Cloudinary...');
        console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
        console.log('API Key:', process.env.CLOUDINARY_API_KEY ? '✓ Configurado' : '✗ Não configurado');
        console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? '✓ Configurado' : '✗ Não configurado');

        // Testar ping
        const result = await cloudinary.api.ping();
        console.log('✅ Conexão com Cloudinary OK:', result);
    } catch (error) {
        console.error('❌ Erro ao conectar com Cloudinary:', error);
    }
}

testCloudinary();
