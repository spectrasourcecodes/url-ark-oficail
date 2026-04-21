// src/pages/Invest.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Clock, 
  Award, 
  X, 
  Copy, 
  Check,
  Wallet,
  ExternalLink,
  AlertCircle,
  RefreshCw,
  Shield,
  Zap,
  BarChart3,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  History,
  Star,
  Rocket,
  Target,
  Crown,
  Users,
  QrCode,
  CreditCard
} from 'lucide-react';
import { toast } from 'react-toastify';

const Invest = () => {
  const [selectedAsset, setSelectedAsset] = useState('BTC');
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('crypto'); // 'crypto' or 'pix'

  const assets = [
    { 
      id: 'BTC', 
      name: 'Bitcoin', 
      symbol: 'BTC', 
      price: 52345, 
      change: 5.2, 
      apy: 8.5,
      icon: '₿',
      color: 'from-orange-500 to-yellow-500',
      bg: 'bg-orange-50',
      textColor: 'text-orange-600',
      risk: 'Baixo'
    },
    { 
      id: 'ETH', 
      name: 'Ethereum', 
      symbol: 'ETH', 
      price: 3234, 
      change: 3.8, 
      apy: 6.2,
      icon: 'Ξ',
      color: 'from-blue-500 to-indigo-500',
      bg: 'bg-blue-50',
      textColor: 'text-blue-600',
      risk: 'Baixo'
    },
    { 
      id: 'USDT', 
      name: 'Tether', 
      symbol: 'USDT', 
      price: 1.00, 
      change: 0.01, 
      apy: 4.5,
      icon: '💵',
      color: 'from-green-500 to-emerald-500',
      bg: 'bg-green-50',
      textColor: 'text-green-600',
      risk: 'Muito Baixo'
    },
    { 
      id: 'SOL', 
      name: 'Solana', 
      symbol: 'SOL', 
      price: 142.50, 
      change: 7.2, 
      apy: 9.5,
      icon: 'SOL',
      color: 'from-purple-500 to-pink-500',
      bg: 'bg-purple-50',
      textColor: 'text-purple-600',
      risk: 'Médio'
    },
  ];

  // Investment Plans updated based on the image (R$ 300 to R$ 3,000 with 10x return)
  // Each plan has 6 hours duration and guaranteed return
  const investmentPlans = [
    {
      id: 'plan_300',
      name: 'Plano Bronze',
      icon: Star,
      minAmount: 300,
      maxAmount: 300,
      returnRate: 900, // 300 -> 3,000 (10x)
      period: '6 horas',
      description: 'Invista R$ 300 e receba R$ 3.000',
      features: ['Retorno garantido 100%', 'Suporte básico', 'Pagamento em 6 horas'],
      color: 'from-amber-500 to-orange-500',
      bg: 'bg-amber-50',
      borderColor: 'border-amber-200',
      popularity: 'Popular'
    },
    {
      id: 'plan_400',
      name: 'Plano Prata',
      icon: TrendingUp,
      minAmount: 400,
      maxAmount: 400,
      returnRate: 900, // 400 -> 4,000 (10x)
      period: '6 horas',
      description: 'Invista R$ 400 e receba R$ 4.000',
      features: ['Retorno garantido 100%', 'Suporte prioritário', 'Pagamento em 6 horas', 'Bônus de indicação'],
      color: 'from-gray-400 to-gray-600',
      bg: 'bg-gray-50',
      borderColor: 'border-gray-200',
      popularity: 'Mais Escolhido'
    },
    {
      id: 'plan_500',
      name: 'Plano Ouro',
      icon: Crown,
      minAmount: 500,
      maxAmount: 500,
      returnRate: 900, // 500 -> 5,000 (10x)
      period: '6 horas',
      description: 'Invista R$ 500 e receba R$ 5.000',
      features: ['Retorno garantido 100%', 'Suporte VIP 24/7', 'Pagamento em 6 horas', 'Cashback mensal'],
      color: 'from-yellow-500 to-amber-500',
      bg: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      popularity: 'VIP'
    },
    {
      id: 'plan_600',
      name: 'Plano Diamante',
      icon: Rocket,
      minAmount: 600,
      maxAmount: 600,
      returnRate: 900, // 600 -> 6,000 (10x)
      period: '6 horas',
      description: 'Invista R$ 600 e receba R$ 6.000',
      features: ['Retorno garantido 100%', 'Gerente dedicado', 'Pagamento em 6 horas', 'Eventos exclusivos'],
      color: 'from-blue-500 to-cyan-500',
      bg: 'bg-blue-50',
      borderColor: 'border-blue-200',
      popularity: 'Limitado'
    },
    {
      id: 'plan_700',
      name: 'Plano Platina',
      icon: Target,
      minAmount: 700,
      maxAmount: 700,
      returnRate: 900, // 700 -> 7,000 (10x)
      period: '6 horas',
      description: 'Invista R$ 700 e receba R$ 7.000',
      features: ['Retorno garantido 100%', 'Saque prioritário', 'Pagamento em 6 horas', 'Consultoria exclusiva'],
      color: 'from-indigo-500 to-purple-500',
      bg: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      popularity: 'Novo'
    },
    {
      id: 'plan_800',
      name: 'Plano Rubi',
      icon: Zap,
      minAmount: 800,
      maxAmount: 800,
      returnRate: 900, // 800 -> 8,000 (10x)
      period: '6 horas',
      description: 'Invista R$ 800 e receba R$ 8.000',
      features: ['Retorno garantido 100%', 'Saque instantâneo', 'Pagamento em 6 horas', 'Yield farming avançado'],
      color: 'from-red-500 to-pink-500',
      bg: 'bg-red-50',
      borderColor: 'border-red-200',
      popularity: 'Premium'
    },
    {
      id: 'plan_900',
      name: 'Plano Esmeralda',
      icon: Shield,
      minAmount: 900,
      maxAmount: 900,
      returnRate: 900, // 900 -> 9,000 (10x)
      period: '6 horas',
      description: 'Invista R$ 900 e receba R$ 9.000',
      features: ['Retorno garantido 100%', 'Proteção de capital', 'Pagamento em 6 horas', 'Bônus exclusivo'],
      color: 'from-emerald-500 to-green-500',
      bg: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      popularity: 'Recomendado'
    },
    {
      id: 'plan_1000',
      name: 'Plano Safira',
      icon: BarChart3,
      minAmount: 1000,
      maxAmount: 1000,
      returnRate: 900, // 1,000 -> 10,000 (10x)
      period: '6 horas',
      description: 'Invista R$ 1.000 e receba R$ 10.000',
      features: ['Retorno garantido 100%', 'Multiplicação máxima', 'Pagamento em 6 horas', 'Acesso antecipado'],
      color: 'from-blue-600 to-purple-600',
      bg: 'bg-blue-100',
      borderColor: 'border-blue-300',
      popularity: 'Destaque'
    },
    {
      id: 'plan_2000',
      name: 'Plano Topázio',
      icon: Award,
      minAmount: 2000,
      maxAmount: 2000,
      returnRate: 900, // 2,000 -> 20,000 (10x)
      period: '6 horas',
      description: 'Invista R$ 2.000 e receba R$ 20.000',
      features: ['Retorno garantido 100%', 'Saque prioritário 24/7', 'Pagamento em 6 horas', 'Cashback de 5%'],
      color: 'from-cyan-500 to-teal-500',
      bg: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      popularity: 'Elite'
    },
    {
      id: 'plan_3000',
      name: 'Plano Imperial',
      icon: Crown,
      minAmount: 3000,
      maxAmount: 3000,
      returnRate: 900, // 3,000 -> 30,000 (10x)
      period: '6 horas',
      description: 'Invista R$ 3.000 e receba R$ 30.000',
      features: ['Retorno garantido 100%', 'Gerente exclusivo', 'Pagamento em 6 horas', 'Viagem VIP anual'],
      color: 'from-purple-600 to-pink-600',
      bg: 'bg-purple-50',
      borderColor: 'border-purple-200',
      popularity: 'Limitado'
    },
  ];

  // Updated wallet address for TRC20 (USDT)
  const walletAddresses = {
    BTC: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    ETH: '0x742d35Cc6634C0532925a3b844Bc5e75dC7a3a5d',
    USDT: 'TFw1MqfF9zLZmvictiAZWZffcH5iDWLY8K', // Updated TRC20 address
    SOL: 'solana_wallet_address_demo_123456789',
  };

  // PIX QR Code (mock - in production this would be dynamic)
  const pixQRCode = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=00020126360014BR.GOV.BCB.PIX0114+551199999999952040000530398654040.005802BR5913ARK INVEST6009SAO PAULO62070503***6304E2A3";
  const pixKey = "arkinvest@investimentos.com.br";

  const selectedAssetData = assets.find(a => a.id === selectedAsset);
  const selectedPlan = investmentPlans.find(p => p.id === selectedPlanId);

  const calculateProjectedReturn = () => {
    if (!selectedPlan) return 0;
    // Return is 10x the investment amount (as per the image)
    return selectedPlan.minAmount * 10 - selectedPlan.minAmount;
  };

  const totalAmount = selectedPlan ? selectedPlan.minAmount + calculateProjectedReturn() : 0;

  const handleSelectPlan = (planId) => {
    setSelectedPlanId(planId);
  };

  const handleInvestNow = () => {
    if (!selectedPlanId) {
      toast.error('Por favor, selecione um plano de investimento');
      return;
    }
    setIsModalOpen(true);
  };

  const handleCopyAddress = (address) => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    toast.success('Endereço da carteira copiado para a área de transferência!');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleCopyPixKey = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    toast.success('Chave PIX copiada para a área de transferência!');
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePaymentConfirmed = () => {
    if (!agreeToTerms) {
      toast.error('Por favor, aceite os termos e condições');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Solicitação enviada! Seu pagamento será verificado e seu lucro será creditado em até 6 horas.");
      setIsModalOpen(false);
      setSelectedPlanId(null);
      setAgreeToTerms(false);
      setSelectedPaymentMethod('crypto');
    }, 2000);
  };

  const walletAddress = walletAddresses[selectedAsset];
  const projectedReturn = calculateProjectedReturn();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(value);
  };

  // Group plans for better display (showing all 10 plans in a grid)
  const displayPlans = investmentPlans;

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Planos de Investimento
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <History className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <BarChart3 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-6 text-white mb-8 relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat'
            }}
          />
          <div className="relative flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Invista e Receba em 6 Horas!</h2>
              <p className="text-white/80">Retorno garantido de 1000% sobre seu investimento</p>
            </div>
            <Sparkles className="w-12 h-12 text-white/30" />
          </div>
        </div>

        {/* Asset Selection */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Selecionar Ativo</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {assets.map((asset) => (
              <button
                key={asset.id}
                onClick={() => setSelectedAsset(asset.id)}
                className={`relative p-4 rounded-2xl border-2 transition-all duration-300 overflow-hidden group
                  ${selectedAsset === asset.id 
                    ? `border-${asset.color.split('-')[1]}-500 bg-gradient-to-br ${asset.color} bg-opacity-10` 
                    : 'border-gray-200 hover:border-gray-300 bg-white'}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${asset.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                <div className="relative">
                  <div className={`w-12 h-12 ${asset.bg} rounded-xl flex items-center justify-center mb-3 mx-auto`}>
                    <span className={`text-2xl ${asset.textColor}`}>{asset.icon}</span>
                  </div>
                  <p className="font-semibold text-sm">{asset.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatCurrency(asset.price)}</p>
                  <p className={`text-xs font-medium mt-1 ${
                    asset.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {asset.change >= 0 ? '+' : ''}{asset.change}%
                  </p>
                  {selectedAsset === asset.id && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full border-2 border-white" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Investment Plans Cards - Updated with 10 plans */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Planos de Investimento Garantidos</h2>
              <p className="text-gray-600 mt-1">Escolha o valor que deseja investir e receba 10x em apenas 6 horas!</p>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-sm text-gray-500">Retorno 100% garantido</span>
              <Shield className="w-4 h-4 text-green-600" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {displayPlans.map((plan) => {
              const Icon = plan.icon;
              const isSelected = selectedPlanId === plan.id;
              const returnAmount = plan.minAmount * 10;
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl transition-all duration-300 cursor-pointer
                    ${isSelected 
                      ? `ring-2 ring-blue-500 shadow-2xl transform scale-105` 
                      : 'hover:shadow-xl hover:transform hover:-translate-y-1'}`}
                  onClick={() => handleSelectPlan(plan.id)}
                >
                  {/* Popular Badge */}
                  {plan.popularity !== 'Popular' && plan.popularity !== 'Novo' && (
                    <div className="absolute -top-3 -right-3 z-10">
                      <div className={`px-2 py-1 text-xs font-bold text-white rounded-full bg-gradient-to-r ${plan.color} shadow-lg`}>
                        {plan.popularity}
                      </div>
                    </div>
                  )}
                  
                  <div className={`bg-white rounded-2xl overflow-hidden border-2 ${isSelected ? plan.borderColor : 'border-gray-100'}`}>
                    {/* Header */}
                    <div className={`p-4 bg-gradient-to-br ${plan.color} text-white`}>
                      <div className="flex items-center justify-between mb-3">
                        <Icon className="w-6 h-6 text-white/90" />
                        <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {plan.period}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                      <p className="text-white/80 text-xs">{plan.description}</p>
                    </div>

                    {/* Body */}
                    <div className="p-4">
                      {/* Price */}
                      <div className="mb-3">
                        <div className="flex items-baseline justify-between">
                          <span className="text-2xl font-bold text-gray-900">
                            {formatCurrency(plan.minAmount)}
                          </span>
                          <span className="text-xs text-gray-500">investimento</span>
                        </div>
                        <div className="flex items-baseline justify-between mt-1">
                          <span className="text-xl font-bold text-green-600">
                            {formatCurrency(returnAmount)}
                          </span>
                          <span className="text-xs text-gray-500">retorno</span>
                        </div>
                        <div className="mt-2 text-center">
                          <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                            +900% em 6h
                          </span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-1 mb-4">
                        {plan.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center text-xs">
                            <Check className="w-3 h-3 text-green-600 mr-1 flex-shrink-0" />
                            <span className="text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Select Button */}
                      <button
                        onClick={() => handleSelectPlan(plan.id)}
                        className={`w-full py-2 rounded-xl font-semibold text-sm transition-all duration-300
                          ${isSelected 
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      >
                        {isSelected ? 'Selecionado ✓' : 'Investir Agora'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Plan Summary */}
        {selectedPlan && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-6 mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Plano Selecionado: {selectedPlan.name}</h3>
                <p className="text-gray-600">Investimento: {formatCurrency(selectedPlan.minAmount)}</p>
                <p className="text-green-600 font-medium mt-1">Retorno garantido: {formatCurrency(selectedPlan.minAmount * 10)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Seu lucro</p>
                <p className="text-3xl font-bold text-green-600">+{formatCurrency(projectedReturn)}</p>
                <p className="text-xs text-gray-500 flex items-center justify-end mt-1">
                  <Clock className="w-3 h-3 mr-1" />
                  em {selectedPlan.period}
                </p>
              </div>
              <button
                onClick={handleInvestNow}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-xl transition-all hover:scale-105 hover:shadow-xl"
              >
                Confirmar Investimento
              </button>
            </div>
          </div>
        )}

        {/* Sidebar - Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Investidores Ativos</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">12.345</p>
            <p className="text-sm text-green-600 mt-2">+23% este mês</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <Wallet className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Total Pago em Lucros</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(45200000)}</p>
            <p className="text-sm text-green-600 mt-2">+45% este mês</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Taxa de Sucesso</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">100%</p>
            <p className="text-sm text-gray-600 mt-2">Retorno garantido para todos</p>
          </div>
        </div>

        {/* Payment Modal - Updated with PIX option and TRC20 address */}
        {isModalOpen && selectedPlan && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)} />

            <div className="relative min-h-screen flex items-center justify-center p-4">
              <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full transform transition-all">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Completar Investimento</h3>
                      <p className="text-sm text-gray-500">Escolha sua forma de pagamento</p>
                    </div>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Investment Summary */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Plano</p>
                        <p className="text-lg font-bold text-gray-900">{selectedPlan.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Valor a Investir</p>
                        <p className="text-xl font-bold text-gray-900">{formatCurrency(selectedPlan.minAmount)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Lucro Garantido</p>
                        <p className="text-lg font-semibold text-green-600">+{formatCurrency(projectedReturn)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Tempo para Retorno</p>
                        <p className="text-lg font-semibold text-blue-600 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          6 horas
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Método de Pagamento
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setSelectedPaymentMethod('crypto')}
                        className={`p-4 rounded-xl border-2 transition-all flex items-center justify-center space-x-2
                          ${selectedPaymentMethod === 'crypto' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'}`}
                      >
                        <CreditCard className="w-5 h-5 text-gray-600" />
                        <span className="font-medium">Cripto (USDT)</span>
                      </button>
                      <button
                        onClick={() => setSelectedPaymentMethod('pix')}
                        className={`p-4 rounded-xl border-2 transition-all flex items-center justify-center space-x-2
                          ${selectedPaymentMethod === 'pix' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'}`}
                      >
                        <QrCode className="w-5 h-5 text-green-600" />
                        <span className="font-medium">PIX</span>
                      </button>
                    </div>
                  </div>

                  {/* Crypto Payment Section */}
                  {selectedPaymentMethod === 'crypto' && (
                    <>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Envie {selectedPlan.minAmount} USDT (TRC20) para este endereço
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={walletAddresses.USDT}
                            readOnly
                            className="w-full px-4 py-4 pr-24 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono"
                          />
                          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                            <button
                              onClick={() => handleCopyAddress(walletAddresses.USDT)}
                              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                              {copied ? (
                                <Check className="w-5 h-5 text-green-600" />
                              ) : (
                                <Copy className="w-5 h-5 text-gray-600" />
                              )}
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Rede: TRC20 | Envie exatamente {formatCurrency(selectedPlan.minAmount)} USDT
                        </p>
                      </div>

                      {/* QR Code for Crypto (mock) */}
                      <div className="flex justify-center mb-6">
                        <div className="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                          <span className="text-xs text-gray-400 text-center">
                            Escaneie o QR
                            <br />
                            para pagar
                          </span>
                        </div>
                      </div>
                    </>
                  )}

                  {/* PIX Payment Section */}
                  {selectedPaymentMethod === 'pix' && (
                    <>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pague com PIX - Valor: {formatCurrency(selectedPlan.minAmount)}
                        </label>
                        
                        {/* PIX QR Code */}
                        <div className="flex justify-center mb-4">
                          <div className="w-48 h-48 bg-white rounded-xl border-2 border-gray-200 p-2">
                            <img 
                              src={pixQRCode} 
                              alt="PIX QR Code"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>

                        {/* PIX Key */}
                        <div className="relative">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Chave PIX (copiar e colar)
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={pixKey}
                              readOnly
                              className="w-full px-4 py-4 pr-24 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                            />
                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                              <button
                                onClick={handleCopyPixKey}
                                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                              >
                                {copied ? (
                                  <Check className="w-5 h-5 text-green-600" />
                                ) : (
                                  <Copy className="w-5 h-5 text-gray-600" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Após o pagamento, seu investimento será confirmado em até 10 minutos
                        </p>
                      </div>
                    </>
                  )}

                  {/* Instructions */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                    <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Instruções de Pagamento
                    </h4>
                    <ol className="text-sm text-yellow-700 space-y-2 list-decimal list-inside">
                      <li>Escolha o método de pagamento (Cripto USDT ou PIX)</li>
                      <li>Realize o pagamento do valor exato de {formatCurrency(selectedPlan.minAmount)}</li>
                      <li>Após a confirmação, aguarde 6 horas para receber seu lucro</li>
                      <li>O valor total ({formatCurrency(selectedPlan.minAmount * 10)}) será enviado para sua conta</li>
                      <li>Retorno 100% garantido conforme prometido</li>
                    </ol>
                  </div>

                  {/* Terms Agreement */}
                  <div className="flex items-start mb-6">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="mt-1 mr-3 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      Confirmo que li e concordo com os 
                      <a href="#" className="text-blue-600 hover:text-blue-700 mx-1">termos e condições</a>
                      do plano {selectedPlan.name}. Entendo que o retorno de {formatCurrency(projectedReturn)} será creditado em até 6 horas.
                    </label>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 bg-gray-100 text-gray-800 font-semibold py-4 px-6 rounded-xl hover:bg-gray-200 transition-all"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handlePaymentConfirmed}
                      disabled={!agreeToTerms || isLoading}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <RefreshCw className="w-5 h-5 animate-spin mr-2" />
                          Processando...
                        </span>
                      ) : (
                        `Confirmar Pagamento de ${formatCurrency(selectedPlan.minAmount)}`
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invest;